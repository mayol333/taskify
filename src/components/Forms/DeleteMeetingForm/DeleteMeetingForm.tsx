import { Button } from "../../ui/Button/Button";
import { DeleteMeetingFormProps } from "./types";
export const DeleteMeetingForm = ({
    title,
    meetingId,
    handleModalClose,
    handleDelete,
}: DeleteMeetingFormProps) => {
    return (
        <div className="delete-task-form">
            <p>Are you sure you want to delete {title}?</p>
            <div className="delete-cancel-buttons">
                <Button onClick={() => handleDelete(meetingId)}>delete</Button>
                <Button onClick={handleModalClose}>cancel</Button>
            </div>
        </div>
    );
};
