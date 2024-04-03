export interface ChartData {
    dates: string[];
    hours: number[];
}

export interface ReportDetails {
    date: string;
    details: {
        startTime: string;
        endTime: string;
        totalTime: number;
        type: string;
    }[];
}

export type Period = "today" | "thisWeek" | "thisMonth";