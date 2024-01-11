import { TaskProps } from "./types";
import { Icon } from "../Icon/Icon";
import { ChangeEventHandler, useState } from "react";

export const Task = ({
    title,
    date,
    startTime,
    endTime,
    complete,
    taskType,
}: TaskProps) => {
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
                                <button className="task-edit">edit</button>
                                <button className="task-delete">delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
