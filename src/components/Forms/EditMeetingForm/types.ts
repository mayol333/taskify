import { MeetingType } from "../../ui/Meeting/type"

export type FormState = MeetingType 
export interface EditMeetingFormProps {
    submit: (formState: FormState, meetingId: string) => Promise<void>
    initialValues:MeetingType
}