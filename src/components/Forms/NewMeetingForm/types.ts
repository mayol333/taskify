import { MeetingType } from "../../ui/Meeting/type";

export type FormState = Omit<MeetingType,"id"> 
export interface NewMeetingFormProps {
    submit: (formState: FormState) => Promise<void>;
}