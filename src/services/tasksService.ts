import { EditTaskFormState } from "../components/Forms/EditTaskForm/types";
import { NewTaskFormState } from "../components/Forms/NewTaskForm/types";
import { v4 as uuidv4 } from "uuid";
import { client } from "../http/client";

export const tasksService = {
    getTasks: async () => {
        try {
            const { data } = await client.get("/tasks");
            return data
        } catch (error) {
            console.log(error);
            return []
        }
    },
    editTask: async (formState:EditTaskFormState,taskId:string) => {
        try {
            await client.patch(`/tasks/${taskId}`, 
            formState
            );
        } catch (error) {
            console.log(error);
        }
    },
    createTask: async (formState:NewTaskFormState) => {
        try {
            await client.post("/tasks", {
                id: uuidv4(), ...formState
            });
        } catch (error) {
            console.log(error);
        }
    },
    deleteTask: async (taskId:string) => {
        try {
            await client.delete(`/tasks/${taskId}/`);
        } catch (error) {
            console.log(error);
        }
    }
}

