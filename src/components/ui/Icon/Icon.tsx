import { ReactNode } from "react";
import Plus from "../../../assets/plus-icon.svg?react";
import Reports from "../../../assets/reports-icon.svg?react";
import Search from "../../../assets/search-icon.svg?react";
import Notebook from "../../../assets/notebook-icon.svg?react";
import Mytasks from "../../../assets/mytasks-icon.svg?react";
import Logo from "../../../assets/logo-icon.svg?react";
import Activity from "../../../assets/activity-icon.svg?react";
import Edit from "../../../assets/edit-icon.svg?react";
type IconType =
    | "plus"
    | "reports"
    | "search"
    | "notebook"
    | "mytasks"
    | "logo"
    | "activity"
    | "edit";
interface IconProps {
    type: IconType;
    className?: string;
    onClick?: () => void;
}
export const Icon = ({ type, className, onClick }: IconProps) => {
    const icons: Record<IconType, ReactNode> = {
        plus: <Plus />,
        reports: <Reports />,
        search: <Search />,
        notebook: <Notebook />,
        mytasks: <Mytasks />,
        logo: <Logo />,
        activity: <Activity />,
        edit: <Edit />,
    };
    return (
        <div onClick={onClick} className={className}>
            {icons[type]}
        </div>
    );
};
