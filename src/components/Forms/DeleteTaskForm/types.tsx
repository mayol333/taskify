export interface DeleteTaskFormProps {
    title: string;
    handleModalClose: () => void;
    taskId: string;
    handleDelete: (taskId: string) => void;
}
