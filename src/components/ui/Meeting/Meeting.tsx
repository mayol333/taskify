import { useState } from "react";
import { Icon } from "../Icon/Icon";
import { useModalState } from "../Modal/hooks";
import { MeetingProps } from "./type";
import { EditMeetingForm } from "../../Forms/EditMeetingForm/EditMeetingForm";
import { Modal } from "../Modal/Modal";
import { DeleteMeetingForm } from "../../Forms/DeleteMeetingForm/DeleteMeetingForm";

export const Meeting = ({
    title,
    date,
    startTime,
    endTime,
    submitEdit,
    handleDelete,
    meetingId,
}: MeetingProps) => {
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const {
        modalOpen: editModalOpen,
        handleModalOpen: handleEditModalOpen,
        handleModalClose: handleEditModalClose,
    } = useModalState();
    const [showEdit, setShowEdit] = useState(false);
    const handleToggleEdit = () => {
        setShowEdit(!showEdit);
    };
    const openEdit = () => {
        handleEditModalOpen();
        setShowEdit(false);
    };
    const openDelete = () => {
        handleModalOpen();
        setShowEdit(false);
    };
    return (
        <div className="meeting-board">
            <div>
                <div className="meeting-type">
                    <Icon type="mytasks" />
                    <h4 className="meeting-title">{title}</h4>
                </div>
                <div className="meeting-time">
                    <p>{date}</p>
                    <p>
                        {startTime} - {endTime}
                    </p>
                </div>
            </div>
            <div className="edit-meeting-icon">
                <Icon onClick={handleToggleEdit} type="edit" />
                {showEdit && (
                    <div className="edit-content">
                        <button onClick={openEdit} className="task-edit">
                            edit
                        </button>
                        <button onClick={openDelete} className="task-delete">
                            delete
                        </button>
                    </div>
                )}
            </div>
            <Modal modalOpen={modalOpen} handleModalClose={handleModalClose}>
                <DeleteMeetingForm
                    title={title}
                    meetingId={meetingId}
                    handleModalClose={handleModalClose}
                    handleDelete={handleDelete}
                />
            </Modal>
            <Modal
                handleModalClose={handleEditModalClose}
                modalOpen={editModalOpen}
            >
                <EditMeetingForm
                    initialValues={{
                        title,
                        date,
                        startTime,
                        endTime,
                        id: meetingId,
                    }}
                    submit={submitEdit}
                />
            </Modal>
        </div>
    );
};
