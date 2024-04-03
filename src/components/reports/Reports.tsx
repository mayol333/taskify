import * as echarts from "echarts";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
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
import { ITask } from "../ui/Task/types";
import { reportsService } from "../../services/reportsService";
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
const parseDayData = (
    date: string,
    tasks: ITask[],
    meetings: MeetingType[]
) => {
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
    tasks: ITask[],
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
    tasksAndMeetings: [ITask[], MeetingType[]],
    timePeriodValue: string[]
) => {
    const [tasks, meetings] = tasksAndMeetings;
    const arrayOfObjects = timePeriodValue.map((date) => {
        const filteredTasks = tasks.filter((task) => {
            return date === task.date;
        });
        const filteredMeetings = meetings.filter((meeting) => {
            return date === meeting.date;
        });
        const finalTasks = filteredTasks.map(({ startTime, endTime }) => {
            const totalTime = differenceInHours(startTime, endTime);
            return {
                startTime,
                endTime,
                totalTime,
                type: "Task",
            };
        });
        const finalMeetings = filteredMeetings.map(({ startTime, endTime }) => {
            const totalTime = differenceInHours(startTime, endTime);
            return {
                startTime,
                endTime,
                totalTime,
                type: "Meeting",
            };
        });
        const details = [...finalTasks, ...finalMeetings];
        return { date, details };
    });
    return arrayOfObjects;
};
export const Reports = () => {
    const [data, setData] = useState<ChartData | null>(null);
    const [select, setSelect] = useState<Period>("today");
    const [tasksAndMeetings, setTasksAndMeetings] = useState<
        [ITask[], MeetingType[]]
    >([[], []]);
    const [report, setReport] = useState<ReportDetails[]>([]);
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
        const reportDetails = getDayDetails(tasksAndMeetings, timePeriodValue);
        const filledDetails = reportDetails.filter((detail) => {
            return detail.details.length !== 0;
        });
        setReport(filledDetails);
    };
    useEffect(() => {
        const getData = async () => {
            const data = await reportsService.getReport();
            const [tasks, meetings] = data;
            setTasksAndMeetings([tasks.data, meetings.data]);
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
                {report.map(({ date, details }) => {
                    return (
                        <div key={date} className="report-list-container">
                            <h3 className="report-date-headline">{date}</h3>
                            {details.map(
                                (
                                    { startTime, endTime, totalTime, type },
                                    index
                                ) => {
                                    return (
                                        <div
                                            key={`${date}-${index}`}
                                            className="report-details"
                                        >
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
