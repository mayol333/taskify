import { FormState } from "../components/Forms/NewActivityForm/types";
import { client } from "../http/client";
import { v4 as uuidv4 } from "uuid";

export const activitiesService = {
    getActivities: async () => {
        try {
            const {data} = await client.get("/activities");
            return data
        } catch (error) {
            console.log(error)
            return[]
        }
    },
    createActivity: async (formState:FormState) => {
        try {
            await client.post("/activities", {
                id: uuidv4(),
                ...formState
            });
        } catch (error) {
            console.log(error);
        }
    }
}