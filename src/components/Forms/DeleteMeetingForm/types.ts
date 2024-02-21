export interface DeleteMeetingFormProps {
    title: string;
    handleModalClose: () => void;
    meetingId: string;
    handleDelete: (meetingId: string) => void;
}