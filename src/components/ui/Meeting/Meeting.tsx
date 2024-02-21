import { Icon } from "../Icon/Icon";
import { MeetingProps } from "./type";

export const Meeting = ({ title, date, startTime, endTime }: MeetingProps) => {
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
            <Icon type="edit" className="edit-meeting-icon" />
        </div>
    );
};
