import { useState, ChangeEvent, FormEventHandler } from "react";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { NewActivityFormProps } from "./types";

export const NewActivityForm = ({ submit }: NewActivityFormProps) => {
    const [form, setForm] = useState({
        title: "",
        createdAt: "",
        content: "",
    });
    const handleForm =
        (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setForm({ ...form, [key]: value });
        };
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!form.title || !form.createdAt || !form.content) {
            return;
        }
        console.log(handleSubmit);
        submit({
            ...form,
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
            <Input
                placeholder="CreatedAt"
                value={form.createdAt}
                onChange={handleForm("createdAt")}
            />
            <Input
                placeholder="Content"
                value={form.content}
                onChange={handleForm("content")}
            />
            <Button>submit</Button>
        </form>
    );
};
