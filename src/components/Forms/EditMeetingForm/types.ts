import { MeetingType } from "../../ui/Meeting/type"

export type EditMeetingFormState = MeetingType 
export interface EditMeetingFormProps {
    submit: (formState: EditMeetingFormState, meetingId: string) => Promise<void>
    initialValues:MeetingType
}