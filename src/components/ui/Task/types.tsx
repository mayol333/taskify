import { EditTaskFormState } from "../../Forms/EditTaskForm/types";

export type TaskType = "fitnessApp" | "newPayment" | "socialMedia";
export interface TaskProps {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    complete: boolean;
    taskType: TaskType;
    handleDelete: (taskId: string) => void;
    taskId: string;
    submitEdit: (formState: EditTaskFormState, taskId: string) => Promise<void>;
}

export interface ITask {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    complete: boolean;
    taskType: TaskType;
}
