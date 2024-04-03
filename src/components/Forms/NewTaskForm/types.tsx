import { ITask } from "../../ui/Task/types";

export interface NewTaskFormState
    extends Omit<ITask, "id" | "complete" | "taskType"> {
    select: string;
}
export interface NewTaskFormProps {
    submit: (formState: NewTaskFormState) => Promise<void>;
}
