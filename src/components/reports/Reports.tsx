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
    // const [startDate, endDate] = span;
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
    // const taskTotalTime = matchedTasks.reduce((total, start) => {
    //     return differenceInHours(start.startTime, start.endTime) + total;
    // }, 0);
    // const meetingTotalTime = matchedMeetings.reduce((total, start) => {
    //     return differenceInHours(start.startTime, start.endTime) + total;
    // }, 0);
    // return taskTotalTime + meetingTotalTime;
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
                total[1][index] += start.hours;
            } else {
                total[0].push(start.date);
                total[1].push(start.hours);
            }
            return total;
        },
        [[], []]
    );
    console.log({ parsedTasks });
    console.log({ parsedMeetings });
    console.log({ result });
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
export const Reports = () => {
    const [data, setData] = useState<ChartData | null>(null);
    const [select, setSelect] = useState<Period>("today");
    const chartRef = useRef(null);
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setSelect(value as Period);
        timePeriod(value as Period);
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await Promise.all([
                    axios.get("http://localhost:8000/tasks"),
                    axios.get("http://localhost:8000/meetings"),
                ]);
                const [tasks, meetings] = data;
                const date = [
                    "2024-01-17",
                    "2024-01-18",
                    "2024-01-19",
                    "2024-01-20",
                ];
                // const count = parseDayData(date, tasks.data, meetings.data);
                const count = parseSpanData(date, tasks.data, meetings.data);
                setData({
                    dates: date,
                    hours: [count],
                });
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
        if (select === "today") {
            parseDayData();
        } else {
            parseSpanData();
        }
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
    useEffect(() => {
        const now = new Date();
        const start = startOfWeek(now, { weekStartsOn: 1 });
        const end = endOfWeek(now, { weekStartsOn: 1 });
        const datesOfTheWeek = eachDayOfInterval({ start, end }).map((date) =>
            format(date, "yyyy-MM-dd")
        );
        console.log(datesOfTheWeek);
    });
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
        </div>
    );
};
