import {
    format,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
} from "date-fns";
import { MeetingType } from "../ui/Meeting/type";
import { ITask } from "../ui/Task/types";
import { Period } from "./types";

export const getTimeStamp = (date: string) => new Date(date).getTime();

export const parseDayData = (
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

export const convertTimeToNumber = (time: string) => {
    const timeSplit = time.split(":").map(Number);
    const [hours, minutes] = timeSplit;
    return hours * 60 + minutes;
};

export const differenceInHours = (time1: string, time2: string) => {
    const time1Converted = convertTimeToNumber(time1);
    const time2Converted = convertTimeToNumber(time2);
    const amountOfTime = time2Converted - time1Converted;
    return Math.abs(amountOfTime) / 60;
};

export const parseSpanData = (
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

export const timePeriod = (period: Period) => {
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

export const getDayDetails = (
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
