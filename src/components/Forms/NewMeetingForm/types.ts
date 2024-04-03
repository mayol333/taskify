import { MeetingType } from "../../ui/Meeting/type";

export type NewMeetingFormState = Omit<MeetingType,"id"> 
export interface NewMeetingFormProps {
    submit: (formState: NewMeetingFormState) => Promise<void>;
}