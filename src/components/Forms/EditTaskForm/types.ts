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
export interface EditTaskFormProps {
    submit: (formState: FormState, taskId: string) => Promise<void>
    initialValues:Task
    taskId:string
}