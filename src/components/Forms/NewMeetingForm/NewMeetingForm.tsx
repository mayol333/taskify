import { DatePicker } from "../../ui/DatePicker/DatePicker";
import { Input } from "../../ui/Input/Input";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Button } from "../../ui/Button/Button";
import { NewMeetingFormProps } from "./types";

export const NewMeetingForm = ({ submit }: NewMeetingFormProps) => {
    const [form, setForm] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
    });
    const handleForm =
        (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setForm({ ...form, [key]: value });
        };
    const handleDateChange = (date: string) => {
        setForm({ ...form, date });
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!form.title || !form.date || !form.startTime || !form.endTime) {
            return;
        }
        submit({
            ...form,
        });
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="new-task-form-title">New Meeting Creator</h2>
            <Input
                placeholder="Title"
                value={form.title}
                onChange={handleForm("title")}
            />
            <DatePicker value={form.date} onChange={handleDateChange} />
            <Input
                placeholder="Start Time"
                value={form.startTime}
                onChange={handleForm("startTime")}
            />
            <Input
                placeholder="End Time"
                value={form.endTime}
                onChange={handleForm("endTime")}
            />
            <Button>submit</Button>
        </form>
    );
};
