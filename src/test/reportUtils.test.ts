import { test, expect } from "vitest";
import {
    convertTimeToNumber,
    getTimeStamp,
    parseDayData,
    differenceInHours,
    parseSpanData,
    timePeriod,
} from "../components/reports/utils";
import { mockMeetings, mockTasks } from "./mockData";

test("should convert time in string format to number", () => {
    expect(convertTimeToNumber("13:00")).toBe(780);
    expect(convertTimeToNumber("00:00")).toBe(0);
    expect(convertTimeToNumber("14:51")).toBe(891);
    expect(convertTimeToNumber("13:30")).toBe(810);
    expect(convertTimeToNumber("15:25")).toBe(925);
});

test("should convert date to timestamp", () => {
    expect(getTimeStamp("2024-04-30")).toBe(1714435200000);
    expect(getTimeStamp("2023-02-19")).toBe(1676764800000);
    expect(getTimeStamp("2017-02-15")).toBe(1487116800000);
    expect(getTimeStamp("2014-09-30")).toBe(1412035200000);
});

test("should return time period of matching tasks and meetings", () => {
    expect(parseDayData("2024-01-14", mockTasks, mockMeetings)).toBe(6);
    expect(parseDayData("2024-01-29", mockTasks, mockMeetings)).toBe(0);
});

test("should return difference in hours between two times", () => {
    expect(differenceInHours("12:00", "14:00")).toBe(2);
    expect(differenceInHours("13:30", "15:25")).toBe(1.9166666666666667);
});

test("should return dates and time period of activities during every returned day ", () => {
    expect(
        parseSpanData(
            ["2024-01-13", "2024-01-14", "2024-01-15"],
            mockTasks,
            mockMeetings
        )
    ).toMatchObject([
        ["2024-01-14", "2024-01-15"],
        [6, 1],
    ]);
    expect(
        parseSpanData(
            ["2024-01-18", "2024-01-19", "2024-01-20"],
            mockTasks,
            mockMeetings
        )
    ).toMatchObject([[], []]);
});

test("should return number of dates in selected period", () => {
    expect(timePeriod("today")).toHaveLength(1);
    expect(timePeriod("thisWeek")).toHaveLength(7);
    expect(timePeriod("thisMonth").length).toBeGreaterThan(28);
});
