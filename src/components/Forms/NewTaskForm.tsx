import { DatePicker } from "../ui/DatePicker/DatePicker";
import { Input } from "../ui/Input/Input";
import { Select } from "../ui/Select/Select";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
export const NewTaskForm = () => {
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
    return (
        <form className="form">
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
        </form>
    );
};
