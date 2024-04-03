import { DatePicker } from "../../ui/DatePicker/DatePicker";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEventHandler,
    useState,
} from "react";
import { EditTaskFormProps } from "./types";
import { Button } from "../../ui/Button/Button";
import { TaskType } from "../../ui/Task/types";

export const EditTaskForm = ({
    submit,
    initialValues,
    taskId,
}: EditTaskFormProps) => {
    const [form, setForm] = useState(() => initialValues);
    console.log(form.date);
    const handleForm =
        (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setForm({ ...form, [key]: value });
        };
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setForm({ ...form, taskType: value as TaskType });
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
        console.log(handleSubmit);
        submit(
            {
                ...form,
                select: "",
            },
            taskId
        );
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="new-task-form-title">Edit Task Creator</h2>
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
