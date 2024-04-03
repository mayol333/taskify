import * as echarts from "echarts";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { MeetingType } from "../ui/Meeting/type";
import { Select } from "../ui/Select/Select";
import { ITask } from "../ui/Task/types";
import { reportsService } from "../../services/reportsService";
import { ChartData, Period, ReportDetails } from "./types";
import {
    timePeriod,
    parseDayData,
    parseSpanData,
    getDayDetails,
} from "./utils";

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
