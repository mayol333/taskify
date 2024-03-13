import * as echarts from "echarts";
import axios from "axios";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Task } from "../tasks/Tasks";
import { MeetingType } from "../ui/Meeting/type";
import { Select } from "../ui/Select/Select";
import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
} from "date-fns";
interface ChartData {
    dates: string[];
    hours: number[];
}
interface ReportDetails {
    date: string;
    details: {
        startTime: string;
        endTime: string;
        totalTime: number;
        type: string;
    }[];
}
type Period = "today" | "thisWeek" | "thisMonth";
const getTimeStamp = (date: string) => new Date(date).getTime();
const parseDayData = (date: string, tasks: Task[], meetings: MeetingType[]) => {
    const matchedTasks = tasks.filter((task) => task.date === date);
    const matchedMeetings = meetings.filter((meeting) => meeting.date === date);
    const taskTotalTime = matchedTasks.reduce((total, start) => {
        return differenceInHours(start.startTime, start.endTime) + total;
    }, 0);
    const meetingTotalTime = matchedMeetings.reduce((total, start) => {
        return differenceInHours(start.startTime, start.endTime) + total;
    }, 0);
    return taskTotalTime + meetingTotalTime;
};
const convertTimeToNumber = (time: string) => {
    const timeSplit = time.split(":").map(Number);
    const [hours, minutes] = timeSplit;
    return hours * 60 + minutes;
};
const differenceInHours = (time1: string, time2: string) => {
    const time1Converted = convertTimeToNumber(time1);
    const time2Converted = convertTimeToNumber(time2);
    const amountOfTime = time2Converted - time1Converted;
    return Math.abs(amountOfTime) / 60;
};
const parseSpanData = (
    span: string[],
    tasks: Task[],
    meetings: MeetingType[]
) => {
    const startDate = span[0];
    const endDate = span[span.length - 1];
    const matchedTasks = tasks.filter(
        (task) =>
            getTimeStamp(task.date) >= getTimeStamp(startDate) &&
            getTimeStamp(task.date) <= getTimeStamp(endDate)
    );
    const matchedMeetings = meetings.filter(
        (meeting) =>
            getTimeStamp(meeting.date) >= getTimeStamp(startDate) &&
            getTimeStamp(meeting.date) <= getTimeStamp(endDate)
    );
    const parsedTasks = matchedTasks.map((task) => {
        return {
            date: task.date,
            hours: differenceInHours(task.startTime, task.endTime),
        };
    });
    const parsedMeetings = matchedMeetings.map((meeting) => {
        return {
            date: meeting.date,
            hours: differenceInHours(meeting.startTime, meeting.endTime),
        };
    });
    const result = [...parsedTasks, ...parsedMeetings].reduce(
        (total: Array<string[] & number[]>, start) => {
            if (total[0].includes(start.date)) {
                const index = total[0].indexOf(start.date);
                (total[1][index] as number) += start.hours;
            } else {
                total[0].push(start.date);
                total[1].push(start.hours);
            }
            return total;
        },
        [[], []]
    );
    return result;
};
const testData: ReportDetails[] = [
    {
        date: "2024-03-13",
        details: [
            {
                startTime: "10:00",
                endTime: "12:00",
                totalTime: 2,
                type: "Task",
            },
            {
                startTime: "14:00",
                endTime: "16:00",
                totalTime: 2,
                type: "Task",
            },
        ],
    },
    {
        date: "2024-03-15",
        details: [
            {
                startTime: "10:00",
                endTime: "12:00",
                totalTime: 2,
                type: "Task",
            },
            {
                startTime: "14:00",
                endTime: "16:00",
                totalTime: 2,
                type: "Task",
            },
        ],
    },
];

const timePeriod = (period: Period) => {
    switch (period) {
        case "today":
            return [format(new Date(), "yyyy-MM-dd")];
        case "thisWeek": {
            const now = new Date();
            const start = startOfWeek(now, { weekStartsOn: 1 });
            const end = endOfWeek(now, { weekStartsOn: 1 });
            const datesOfTheWeek = eachDayOfInterval({ start, end }).map(
                (date) => format(date, "yyyy-MM-dd")
            );
            return datesOfTheWeek;
        }
        case "thisMonth": {
            const now = new Date();
            const start = startOfMonth(now);
            const end = endOfMonth(now);
            const datesOfTheMonth = eachDayOfInterval({ start, end }).map(
                (date) => format(date, "yyyy-MM-dd")
            );
            return datesOfTheMonth;
        }
    }
};
const getDayDetails = (
    tasksAndMeetings: [Task[], MeetingType[]],
    timePeriodValue: string[]
) => {
    const [tasks, meetings] = tasksAndMeetings;
    const filteredTasks = tasks.filter(({ date }) => {
        return timePeriodValue.includes(date);
    });
    const filteredMeetings = meetings.filter(({ date }) => {
        return timePeriodValue.includes(date);
    });
};
export const Reports = () => {
    const [data, setData] = useState<ChartData | null>(null);
    const [select, setSelect] = useState<Period>("today");
    const [tasksAndMeetings, setTasksAndMeetings] = useState<
        [Task[], MeetingType[]]
    >([[], []]);
    const chartRef = useRef(null);
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setSelect(value as Period);
        const [tasks, meetings] = tasksAndMeetings;
        const timePeriodValue = timePeriod(value as Period);
        if (value === "today") {
            const todayChartData = parseDayData(
                timePeriodValue[0],
                tasks,
                meetings
            );
            setData({
                dates: timePeriodValue,
                hours: [todayChartData],
            });
        } else {
            const [dates, hours] = parseSpanData(
                timePeriodValue,
                tasks,
                meetings
            );
            setData({
                dates,
                hours,
            });
        }
        getDayDetails(tasksAndMeetings, timePeriodValue);
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await Promise.all([
                    axios.get<Task[]>("http://localhost:8000/tasks"),
                    axios.get<MeetingType[]>("http://localhost:8000/meetings"),
                ]);
                const [tasks, meetings] = data;
                setTasksAndMeetings([tasks.data, meetings.data]);
            } catch (error) {
                console.log(error);
                return [];
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const { dates, hours } = data || {};
        const options = {
            xAxis: {
                type: "category",
                data: dates,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: hours,
                    type: "bar",
                },
            ],
        };
        chart.setOption(options);
        return () => {
            chart.dispose();
        };
    }, [data, select]);
    return (
        <div className="master-container">
            <h2 className="charts-headline">Reports</h2>
            <div className="select-container">
                <Select
                    placeholder="Time period"
                    options={[
                        { label: "Today", value: "today" },
                        { label: "This week", value: "thisWeek" },
                        { label: "This month", value: "thisMonth" },
                    ]}
                    handleSelect={handleSelect}
                    value={select}
                />
            </div>
            <div className="reports-container">
                <div ref={chartRef} className="chart-container"></div>
            </div>
            <div className="reports-details-list">
                {testData.map(({ date, details }) => {
                    return (
                        <div className="report-list-container">
                            <h3 className="report-date-headline">{date}</h3>
                            {details.map(
                                ({ startTime, endTime, totalTime, type }) => {
                                    return (
                                        <div className="report-details">
                                            <p>
                                                {startTime} - {endTime}
                                            </p>
                                            <p>{totalTime}</p>
                                            <p className="report-details-data-type">
                                                {type}
                                            </p>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
