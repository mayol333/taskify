import { ITask } from "../../ui/Task/types";


export interface EditTaskFormState extends Omit<ITask,"id" | "complete" | "taskType"> {
    select: string;
}
export interface EditTaskFormProps {
    submit: (formState: EditTaskFormState, taskId: string) => Promise<void>
    initialValues:Omit<ITask,"id" | "complete">
    taskId:string
}