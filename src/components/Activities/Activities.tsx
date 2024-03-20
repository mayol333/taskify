import { useState, ChangeEventHandler, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { Input } from "../ui/Input/Input";
import { Modal } from "../ui/Modal/Modal";
import { useModalState } from "../ui/Modal/hooks";
import axios from "axios";
import { FormState } from "../Forms/NewActivityForm/types";
import { v4 as uuidv4 } from "uuid";
import { getActivities } from "../../services/services";
import { Activity } from "../Activity/Activity";
import { ActivityType } from "./types";
import { NewActivityForm } from "../Forms/NewActivityForm/NewActivityForm";

export const Activities = () => {
    const [search, setSearch] = useState("");
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const [activities, setActivities] = useState<ActivityType[]>([]);
    useEffect(() => {
        const getActivitiesData = async () => {
            const tasks = await getActivities();
            setActivities(tasks);
        };
        getActivitiesData();
    }, []);
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setSearch(value);
    };
    const submit = async (formState: FormState) => {
        try {
            await axios.post("http://localhost:8000/activities", {
                id: uuidv4(),
                title: formState.title,
                content: formState.content,
                createdAt: formState.createdAt,
            });
            const activities = await getActivities();
            setActivities(activities);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="activities-section">
            <div className="activities-header">
                <h1 className="activities-headline">Activity</h1>
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
                    New Activity
                </Button>
                <Modal
                    modalOpen={modalOpen}
                    handleModalClose={handleModalClose}
                >
                    <NewActivityForm submit={submit} />
                </Modal>
            </div>
            <div className="activities-data">
                {activities
                    .filter((activity) => {
                        return activity.title.includes(search);
                    })
                    .map((activity) => {
                        return (
                            <Activity
                                title={activity.title}
                                key={activity.id}
                                content={activity.content}
                                createdAt={activity.createdAt}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
