import { test, expect, describe } from "vitest";
import { sortMeetings } from "../components/meetings/utils";
import { mockMeetings } from "./mockData";

describe("should return sorted meetings by:", () => {
    test("title A-Z", () => {
        expect(sortMeetings(mockMeetings, "title_a_z")).toMatchObject([
            {
                id: "46323ac5-291e-495e-8c93-f7a1bf10dc8a",
                title: "Rest day",
                date: "2024-01-17",
                startTime: "17:00",
                endTime: "20:00",
            },
            {
                id: "1392aa51-1b61-438f-9aa6-b5a9bd6b1472",
                title: "Selling Stocks",
                date: "2024-01-14",
                startTime: "14:00",
                endTime: "19:00",
            },
        ]);
    });
    test("title Z-A", () => {
        expect(sortMeetings(mockMeetings, "title_z_a")).toMatchObject([
            {
                id: "1392aa51-1b61-438f-9aa6-b5a9bd6b1472",
                title: "Selling Stocks",
                date: "2024-01-14",
                startTime: "14:00",
                endTime: "19:00",
            },
            {
                id: "46323ac5-291e-495e-8c93-f7a1bf10dc8a",
                title: "Rest day",
                date: "2024-01-17",
                startTime: "17:00",
                endTime: "20:00",
            },
        ]);
    });
    test("date_asc", () => {
        expect(sortMeetings(mockMeetings, "date_asc")).toMatchObject([
            {
                id: "1392aa51-1b61-438f-9aa6-b5a9bd6b1472",
                title: "Selling Stocks",
                date: "2024-01-14",
                startTime: "14:00",
                endTime: "19:00",
            },
            {
                id: "46323ac5-291e-495e-8c93-f7a1bf10dc8a",
                title: "Rest day",
                date: "2024-01-17",
                startTime: "17:00",
                endTime: "20:00",
            },
        ]);
    });
    test("date_desc", () => {
        expect(sortMeetings(mockMeetings, "date_desc")).toMatchObject([
            {
                id: "46323ac5-291e-495e-8c93-f7a1bf10dc8a",
                title: "Rest day",
                date: "2024-01-17",
                startTime: "17:00",
                endTime: "20:00",
            },
            {
                id: "1392aa51-1b61-438f-9aa6-b5a9bd6b1472",
                title: "Selling Stocks",
                date: "2024-01-14",
                startTime: "14:00",
                endTime: "19:00",
            },
        ]);
    });
});
