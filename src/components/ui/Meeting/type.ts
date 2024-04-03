import { EditMeetingFormState } from "../../Forms/EditMeetingForm/types"
export interface MeetingProps {
    title:string
    date:string
    startTime:string
    endTime:string
    handleDelete: (meetingId: string) => void;
    meetingId: string;
    submitEdit: (formState: EditMeetingFormState, meetingId: string) => Promise<void>;
}
export interface MeetingType {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    id:string
}
