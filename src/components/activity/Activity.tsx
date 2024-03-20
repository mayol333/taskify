import { ActivityProps } from "./types";

export const Activity = ({ title, content, createdAt }: ActivityProps) => {
    return (
        <div className="activity-container">
            <div className="title-created-style">
                <h3>{title}</h3>
                <span>{createdAt}</span>
            </div>
            <p>{content}</p>
        </div>
    );
};
