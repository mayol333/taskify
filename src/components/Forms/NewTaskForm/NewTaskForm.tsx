import { DatePicker } from "../../ui/DatePicker/DatePicker";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEventHandler,
    useState,
} from "react";
import { NewTaskFormProps } from "./types";
import { Button } from "../../ui/Button/Button";

export const NewTaskForm = ({ submit }: NewTaskFormProps) => {
    const [form, setForm] = useState({
        title: "",
        date: "",
        taskType: "",
        startTime: "",
        endTime: "",
    });
    const handleForm =
        (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setForm({ ...form, [key]: value });
        };
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setForm({ ...form, taskType: value });
    };
    const handleDateChange = (date: string) => {
        setForm({ ...form, date });
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (
            !form.title ||
            !form.date ||
            !form.taskType ||
            !form.startTime ||
            !form.endTime
        ) {
            return;
        }
        submit({
            ...form,
            select: "",
        });
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="new-task-form-title">New Task Creator</h2>
            <Input
                placeholder="Title"
                value={form.title}
                onChange={handleForm("title")}
            />
            <DatePicker value={form.date} onChange={handleDateChange} />
            <Select
                placeholder="Task Type"
                value={form.taskType}
                options={[
                    { label: "Fitness App", value: "fitnessApp" },
                    { label: "New Payment", value: "newPayment" },
                    { label: "Social Media", value: "socialMedia" },
                ]}
                handleSelect={handleSelect}
            />
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
