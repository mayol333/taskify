import axios from "axios";

export const getTasks = async () => {
    try {
        const { data } = await axios.get("http://localhost:8000/tasks");
        return data
    } catch (error) {
        console.log(error);
        return []
    }
};
export const getMeetings = async () => {
    try {
        const {data} = await axios.get("http://localhost:8000/meetings");
        return data
    } catch (error) {
        console.log(error)
        return[]
    }
}