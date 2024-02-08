export interface Task {
    title: string;
    date: string;
    taskType: string;
    startTime: string;
    endTime: string;
}
export interface FormState extends Task {
    select: string;
}
export interface NewTaskFormProps {
    submit: (formState: FormState) => Promise<void>;
}
