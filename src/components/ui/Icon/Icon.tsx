import { ReactNode } from "react";
import Plus from "../../../assets/plus-icon.svg?react";
import Reports from "../../../assets/reports-icon.svg?react";
import Search from "../../../assets/search-icon.svg?react";
import Notebook from "../../../assets/notebook-icon.svg?react";
import Mytasks from "../../../assets/mytasks-icon.svg?react";
import Logo from "../../../assets/logo-icon.svg?react";
import Activity from "../../../assets/activity-icon.svg?react";
type IconType =
    | "plus"
    | "reports"
    | "search"
    | "notebook"
    | "mytasks"
    | "logo"
    | "activity";
interface IconProps {
    type: IconType;
    className?: string;
}
export const Icon = ({ type, className }: IconProps) => {
    const icons: Record<IconType, ReactNode> = {
        plus: <Plus />,
        reports: <Reports />,
        search: <Search />,
        notebook: <Notebook />,
        mytasks: <Mytasks />,
        logo: <Logo />,
        activity: <Activity />,
    };
    return <div className={className}>{icons[type]}</div>;
};
