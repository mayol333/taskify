import { Task } from "../../tasks/Tasks";

export type TaskType = "fitnessApp" | "newPayment" | "socialMedia";
export type TaskProps = Omit<Task, "id">;
