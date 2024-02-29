import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../tasks/Tasks";
import { MeetingType } from "../ui/Meeting/type";
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
    console.log(taskTotalTime + meetingTotalTime);
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
    const [startDate, endDate] = span;
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
    const taskTotalTime = matchedTasks.reduce((total, start) => {
        return differenceInHours(start.startTime, start.endTime) + total;
    }, 0);
    const meetingTotalTime = matchedMeetings.reduce((total, start) => {
        return differenceInHours(start.startTime, start.endTime) + total;
    }, 0);
    console.log(taskTotalTime + meetingTotalTime);
    return taskTotalTime + meetingTotalTime;
};
export const Reports = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await Promise.all([
                    axios.get("http://localhost:8000/tasks"),
                    axios.get("http://localhost:8000/meetings"),
                ]);
                const [tasks, meetings] = data;
                // parseDayData("2024-01-20", tasks.data, meetings.data);
                // differenceInHours("17:30", "19:00");
                parseSpanData(
                    ["2024-01-17", "2024-01-20"],
                    tasks.data,
                    meetings.data
                );
                return data;
            } catch (error) {
                console.log(error);
                return [];
            }
        };
        getData();
    }, []);
    return <p>Reports</p>;
};
