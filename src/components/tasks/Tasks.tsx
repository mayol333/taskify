import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ITask } from "../ui/Task/types";
import { Modal } from "../ui/Modal/Modal";
import { useModalState } from "../ui/Modal/hooks";
import { NewTaskForm } from "../Forms/NewTaskForm/NewTaskForm";
import { NewTaskFormState } from "../Forms/NewTaskForm/types";
import { EditTaskFormState } from "../Forms/EditTaskForm/types";
import { tasksService } from "../../services/tasksService";
import { Task } from "../ui/Task/Task";

export const Tasks = () => {
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const [tasks, setTasks] = useState<ITask[]>([]);
    useEffect(() => {
        const getTasksData = async () => {
            const tasks = await tasksService.getTasks();
            setTasks(tasks);
        };
        getTasksData();
    }, []);
    const [search, setSearch] = useState("");
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setSearch(value);
    };
    const submit = async (formState: NewTaskFormState) => {
        await tasksService.createTask(formState);
        const tasks = await tasksService.getTasks();
        setTasks(tasks);
        handleModalClose();
    };
    const submitEdit = async (formState: EditTaskFormState, taskId: string) => {
        await tasksService.editTask(formState, taskId);
        const tasks = await tasksService.getTasks();
        setTasks(tasks);
        handleModalClose();
    };
    const handleDelete = async (taskId: string) => {
        await tasksService.deleteTask(taskId);
        const tasks = await tasksService.getTasks();
        setTasks(tasks);
        handleModalClose();
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
