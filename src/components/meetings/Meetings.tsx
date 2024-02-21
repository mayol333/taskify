import { useState, ChangeEventHandler, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { Input } from "../ui/Input/Input";
import { Select } from "../ui/Select/Select";
import { getMeetings } from "../../services/services";
import { useModalState } from "../ui/Modal/hooks";
import { Modal } from "../ui/Modal/Modal";
import { NewMeetingForm } from "../Forms/NewMeetingForm/NewMeetingForm";
import axios from "axios";
import { FormState } from "../Forms/NewMeetingForm/types";
import { v4 as uuidv4 } from "uuid";
import { MeetingType } from "../ui/Meeting/type";
import { Meeting } from "../ui/Meeting/Meeting";
import { parseISO } from "date-fns";

export const Meetings = () => {
    const [searchMeeting, setMeetingSearch] = useState("");
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const [sort, setSort] = useState("");
    const [meetings, setMeetings] = useState<MeetingType[]>([]);
    useEffect(() => {
        const getMeetingsData = async () => {
            const meetings = await getMeetings();
            setMeetings(meetings);
        };
        getMeetingsData();
    }, []);
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setMeetingSearch(value);
    };
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setSort(value);
    };
    const submitEdit = async (formState: FormState, meetingId: string) => {
        try {
            await axios.patch(`http://localhost:8000/meetings/${meetingId}`, {
                title: formState.title,
                date: formState.date,
                startTime: formState.startTime,
                endTime: formState.endTime,
            });
            const meetings = await getMeetings();
            setMeetings(meetings);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (meetingsId: string) => {
        try {
            console.log(handleDelete);
            await axios.delete(`http://localhost:8000/meetings/${meetingsId}/`);
            const meetings = await getMeetings();
            setMeetings(meetings);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };
    const submit = async (formState: FormState) => {
        try {
            await axios.post("http://localhost:8000/meetings", {
                id: uuidv4(),
                title: formState.title,
                date: formState.date,
                startTime: formState.startTime,
                endTime: formState.endTime,
            });
            const meetings = await getMeetings();
            setMeetings(meetings);
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };
    const sortedMeetings = [...meetings].sort((a, b) => {
        switch (sort) {
            case "title_a_z":
                return a.title.localeCompare(b.title);
            case "title_z_a":
                return b.title.localeCompare(a.title);
            case "date_asc":
                return parseISO(a.date).getTime() - parseISO(b.date).getTime();
            case "date_desc":
                return parseISO(b.date).getTime() - parseISO(a.date).getTime();
            default:
                return -1;
        }
    });
    return (
        <section className="meetings-section">
            <div className="meetings-header-container">
                <h1 className="meetings-headliner">Meetings</h1>
                <div className="meetings-inputs-container">
                    <Select
                        placeholder="Sort Meetings"
                        options={[
                            { label: "Title A-Z", value: "title_a_z" },
                            { label: "Title Z-A", value: "title_z_a" },
                            { label: "Date ASC", value: "date_asc" },
                            { label: "Date DESC", value: "date_desc" },
                        ]}
                        handleSelect={handleSelect}
                        value={sort}
                    ></Select>
                    <Input
                        placeholder="Search"
                        isSearch={true}
                        value={searchMeeting}
                        onChange={handleSearch}
                    ></Input>
                    <Button onClick={handleModalOpen}>
                        <Icon type="plus" className="plus-icon" />
                        New Meeting
                    </Button>
                    <Modal
                        modalOpen={modalOpen}
                        handleModalClose={handleModalClose}
                    >
                        <NewMeetingForm submit={submit} />
                    </Modal>
                </div>
            </div>
            <div>
                {sortedMeetings
                    .filter((meeting) => {
                        return meeting.title.includes(searchMeeting);
                    })
                    .map((meeting) => {
                        return (
                            <Meeting
                                title={meeting.title}
                                date={meeting.date}
                                startTime={meeting.startTime}
                                endTime={meeting.endTime}
                                key={meeting.id}
                                handleDelete={handleDelete}
                                meetingId={meeting.id}
                                submitEdit={submitEdit}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
