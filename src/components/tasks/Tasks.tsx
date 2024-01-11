import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import axios from "axios";
import { Icon } from "../ui/Icon/Icon";
import { Task } from "../ui/Task/Task";
import { useEffect, useState } from "react";
import { TaskType } from "../ui/Task/types";

export interface Task {
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    complete: boolean;
    taskType: TaskType;
}
export const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const getTasks = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/tasks");
                setTasks(data);
            } catch (error) {
                console.log(error);
            }
        };
        getTasks();
    }, []);
    return (
        <section className="tasks-section">
            <div className="tasks-header">
                <h1 className="tasks-headline">My Tasks</h1>
                <div className="place-input-to-right">
                    <Input
                        placeholder="Search"
                        isSearch={true}
                        value=""
                        onChange={() => {}}
                    />
                </div>
                <Button>
                    <Icon type="plus" className="plus-icon" />
                    sdfsdfsd
                </Button>
            </div>
            <div className="tasks-data">
                {tasks.map((task) => {
                    return (
                        <Task
                            title={task.title}
                            date={task.date}
                            startTime={task.startTime}
                            endTime={task.endTime}
                            taskType={task.taskType}
                            complete={task.complete}
                            key={task.id}
                        />
                    );
                })}
            </div>
        </section>
    );
};
