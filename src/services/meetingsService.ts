import { client } from "../http/client";
import { EditMeetingFormState } from "../components/Forms/EditMeetingForm/types";
import { NewMeetingFormState } from "../components/Forms/NewMeetingForm/types";

export const meetingsService = {
    getMeetings: async () => {
        try {
            const {data} = await client.get("/meetings");
            return data
        } catch (error) {
            console.log(error)
            return[]
        }
    },
    editMeeting: async (formState:EditMeetingFormState,meetingId:string) => {
        try {
            await client.patch(`/meetings/${meetingId}`, 
                formState
            );
        } catch (error) {
            console.log(error);
        }
    },
    deleteMeeting: async (meetingsId:string) => {
        try {
            await client.delete(`/meetings/${meetingsId}/`);
        } catch (error) {
            console.log(error);
        }
    },
    createMeeting: async (formState:NewMeetingFormState) => {
        try {
            await client.post("/meetings", 
                formState
            );
        } catch (error) {
            console.log(error);
        }
    }
}