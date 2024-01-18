import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { DatePickerProps } from "./types";
import { format } from "date-fns";
const formatDate = (date: Date) => {
    return date ? format(date, "yyyy-MM-dd") : "";
};
const Component = ({ value, onChange }: DatePickerProps) => {
    const selected = value ? new Date(value) : null;
    const handleDateChange = (date: Date) => {
        onChange(formatDate(date));
    };
    console.log(selected);
    return (
        <DatePicker
            selected={selected}
            onChange={handleDateChange}
            dateFormat={"dd-MM-yyyy"}
            maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() + 5))
            }
        />
    );
};
export { Component as DatePicker };
