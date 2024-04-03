import { MeetingType } from "../components/ui/Meeting/type";
import { ITask } from "../components/ui/Task/types";
import { client } from "../http/client";

export const reportsService = {
    getReport: async () => {
        try {
            const data = await Promise.all([
                client.get<ITask[]>("/tasks"),
                client.get<MeetingType[]>("/meetings"),
            ]);
            return data
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}