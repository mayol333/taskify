import { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { Input } from "../ui/Input/Input";
import { Modal } from "../ui/Modal/Modal";
import { useModalState } from "../ui/Modal/hooks";
import { FormState } from "../Forms/NewActivityForm/types";
import { Activity } from "../Activity/Activity";
import { ActivityType } from "./types";
import { NewActivityForm } from "../Forms/NewActivityForm/NewActivityForm";
import { activitiesService } from "../../services/activitiesService";
import { useSearch } from "../../hooks/useSearch";

export const Activities = () => {
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const [activities, setActivities] = useState<ActivityType[]>([]);
    const { search, handleSearch } = useSearch();
    useEffect(() => {
        const getActivitiesData = async () => {
            const tasks = await activitiesService.getActivities();
            setActivities(tasks);
        };
        getActivitiesData();
    }, []);
    const submit = async (formState: FormState) => {
        await activitiesService.createActivity(formState);
        const activities = await activitiesService.getActivities();
        setActivities(activities);
        handleModalClose();
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
