import { parseISO } from "date-fns";
import { MeetingType } from "../ui/Meeting/type";

export const sortMeetings = (meetings:MeetingType[],sort:string) => {
    return [...meetings].sort((a, b) => {
        switch (sort) {
            case "title_a_z":
                return a.title.localeCompare(b.title);
            case "title_z_a":
                return b.title.localeCompare(a.title);
            case "date_asc":
                return parseISO(a.date).getTime() - parseISO(b.date).getTime();
            case "date_desc":
                return parseISO(b.date).getTime() - parseISO(a.date).getTime();
            default:
                return -1;
        }
    });
}