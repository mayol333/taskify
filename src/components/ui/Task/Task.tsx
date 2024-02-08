import { TaskProps } from "./types";
import { Icon } from "../Icon/Icon";
import { ChangeEventHandler, useState } from "react";
import { useModalState } from "../Modal/hooks";
import { DeleteTaskForm } from "../../Forms/DeleteTaskForm/DeleteTaskForm";
import { Modal } from "../Modal/Modal";
import { EditTaskForm } from "../../Forms/EditTaskForm/EditTaskForm";
export const Task = ({
    title,
    date,
    startTime,
    endTime,
    complete,
    taskType,
    handleDelete,
    taskId,
    submitEdit,
}: TaskProps) => {
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const {
        modalOpen: editModalOpen,
        handleModalOpen: handleEditModalOpen,
        handleModalClose: handleEditModalClose,
    } = useModalState();
    const typeStringTransform = {
        fitnessApp: "Fitness app",
        newPayment: "New payment",
        socialMedia: "Social Media",
    };
    const typeBackgroundColor = {
        fitnessApp: "colorful-square-blue",
        newPayment: "colorful-square-yellow",
        socialMedia: "colorful-square-pink",
    };
    const [check, setCheck] = useState(complete);
    const handleCheck: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { checked } = event.target;
        setCheck(checked);
    };
    const isChecked = check ? "opacity" : "";
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
        <div className={`task-board-container ${isChecked}`}>
            <div className="task-board">
                <input
                    className="checkmark"
                    type="checkbox"
                    checked={check}
                    onChange={handleCheck}
                />
                <div
                    className={`colorful-square ${typeBackgroundColor[taskType]}`}
                ></div>
                <div className="title-date">
                    <h4 className="tasks-title">{title}</h4>
                    <div className="date-type-container">
                        <p>{date}</p>
                        <p>{typeStringTransform[taskType]}</p>
                    </div>
                </div>
                <div className="task-time-container">
                    <p>{startTime}</p>
                    <span className="slash">/</span>
                    <p>{endTime}</p>
                    <div className="edit-button-container">
                        <Icon onClick={handleToggleEdit} type="edit" />
                        {showEdit && (
                            <div className="edit-content">
                                <button
                                    onClick={openEdit}
                                    className="task-edit"
                                >
                                    edit
                                </button>
                                <button
                                    onClick={openDelete}
                                    className="task-delete"
                                >
                                    delete
                                </button>
                            </div>
                        )}
                    </div>
                    <Modal
                        modalOpen={modalOpen}
                        handleModalClose={handleModalClose}
                    >
                        <DeleteTaskForm
                            title={title}
                            taskId={taskId}
                            handleModalClose={handleModalClose}
                            handleDelete={handleDelete}
                        />
                    </Modal>
                    <Modal
                        handleModalClose={handleEditModalClose}
                        modalOpen={editModalOpen}
                    >
                        <EditTaskForm
                            initialValues={{
                                title,
                                date,
                                taskType,
                                startTime,
                                endTime,
                            }}
                            submit={submitEdit}
                            taskId={taskId}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    );
};
