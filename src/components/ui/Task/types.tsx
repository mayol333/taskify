import { FormState } from "../../Forms/EditTaskForm/types";

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
    submitEdit: (formState: FormState, taskId: string) => Promise<void>;
}
