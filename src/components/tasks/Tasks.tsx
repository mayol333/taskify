import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import axios from "axios";
import { Icon } from "../ui/Icon/Icon";
import { Task } from "../ui/Task/Task";
import { ChangeEventHandler, useEffect, useState } from "react";
import { TaskType } from "../ui/Task/types";
import { Modal } from "../ui/Modal/Modal";
import { useModalState } from "../ui/Modal/hooks";
import { NewTaskForm } from "../Forms/NewTaskForm/NewTaskForm";
import { v4 as uuidv4 } from "uuid";
import { FormState } from "../Forms/NewTaskForm/types";
import { getTasks } from "../../services/services";

export interface Task {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    complete: boolean;
    taskType: TaskType;
}
export const Tasks = () => {
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const getTasksData = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        };
        getTasksData();
    }, []);
    const [search, setSearch] = useState("");
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setSearch(value);
    };
    console.log(modalOpen);
    const submit = async (formState: FormState) => {
        try {
            await axios.post("http://localhost:8000/tasks", {
                id: uuidv4(),
                title: formState.title,
                date: formState.date,
                taskType: formState.taskType,
                startTime: formState.startTime,
                endTime: formState.endTime,
            });
            const tasks = await getTasks();
            setTasks(tasks);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };
    const submitEdit = async (formState: FormState, taskId: string) => {
        try {
            await axios.patch(`http://localhost:8000/tasks/${taskId}`, {
                title: formState.title,
                date: formState.date,
                taskType: formState.taskType,
                startTime: formState.startTime,
                endTime: formState.endTime,
            });
            const tasks = await getTasks();
            setTasks(tasks);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (taskId: string) => {
        try {
            console.log(handleDelete);
            await axios.delete(`http://localhost:8000/tasks/${taskId}/`);
            const tasks = await getTasks();
            setTasks(tasks);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
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
                        onChange={handleSearch}
                    />
                </div>
                <Button onClick={handleModalOpen}>
                    <Icon type="plus" className="plus-icon" />
                    New Task
                </Button>
                <Modal
                    modalOpen={modalOpen}
                    handleModalClose={handleModalClose}
                >
                    <NewTaskForm submit={submit} />
                </Modal>
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
                                handleDelete={handleDelete}
                                taskId={task.id}
                                submitEdit={submitEdit}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
