import { Button } from "../../ui/Button/Button";
import { DeleteTaskFormProps } from "./types";
export const DeleteTaskForm = ({
    title,
    taskId,
    handleModalClose,
    handleDelete,
}: DeleteTaskFormProps) => {
    return (
        <div className="delete-task-form">
            <p>Are you sure you want to delete {title}?</p>
            <div className="delete-cancel-buttons">
                <Button onClick={() => handleDelete(taskId)}>delete</Button>
                <Button onClick={handleModalClose}>cancel</Button>
            </div>
        </div>
    );
};
