import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import axios from "axios";
import { Icon } from "../ui/Icon/Icon";
import { Task } from "../ui/Task/Task";
import { ChangeEventHandler, useEffect, useState } from "react";
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
    const [search, setSearch] = useState("");
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setSearch(value);
    };
    return (
        <section className="tasks-section">
            <div className="tasks-header">
                <h1 className="tasks-headline">My Tasks</h1>
                <div className="place-input-to-right">
                    <Input
                        placeholder="Search"
                        isSearch={true}
                        value={search}
                        handleSearch={handleSearch}
                    />
                </div>
                <Button>
                    <Icon type="plus" className="plus-icon" />
                    sdfsdfsd
                </Button>
            </div>
            <div className="tasks-data">
                {tasks
                    .filter((task) => {
                        return task.title.includes(search);
                    })
                    .map((task) => {
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
