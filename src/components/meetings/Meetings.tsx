import { useState, ChangeEventHandler, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { Input } from "../ui/Input/Input";
import { Select } from "../ui/Select/Select";
import { useModalState } from "../ui/Modal/hooks";
import { Modal } from "../ui/Modal/Modal";
import { NewMeetingForm } from "../Forms/NewMeetingForm/NewMeetingForm";
import { NewMeetingFormState } from "../Forms/NewMeetingForm/types";
import { MeetingType } from "../ui/Meeting/type";
import { Meeting } from "../ui/Meeting/Meeting";
import { meetingsService } from "../../services/meetingsService";
import { EditMeetingFormState } from "../Forms/EditMeetingForm/types";
import { useSearch } from "../../hooks/useSearch";
import { sortMeetings } from "./utils";

export const Meetings = () => {
    const { modalOpen, handleModalOpen, handleModalClose } = useModalState();
    const [sort, setSort] = useState("");
    const { search, handleSearch } = useSearch();
    const [meetings, setMeetings] = useState<MeetingType[]>([]);
    useEffect(() => {
        const getMeetingsData = async () => {
            const meetings = await meetingsService.getMeetings();
            setMeetings(meetings);
        };
        getMeetingsData();
    }, []);
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setSort(value);
    };
    const submitEdit = async (
        formState: EditMeetingFormState,
        meetingId: string
    ) => {
        await meetingsService.editMeeting(formState, meetingId);
        const meetings = await meetingsService.getMeetings();
        setMeetings(meetings);
        handleModalClose();
    };
    const handleDelete = async (meetingsId: string) => {
        await meetingsService.deleteMeeting(meetingsId);
        const meetings = await meetingsService.getMeetings();
        setMeetings(meetings);
        handleModalClose();
    };
    const submit = async (formState: NewMeetingFormState) => {
        await meetingsService.createMeeting(formState);
        const meetings = await meetingsService.getMeetings();
        setMeetings(meetings);
        handleModalClose();
    };
    const sortedMeetings = sortMeetings(meetings, sort);
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
                        value={search}
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
                        return meeting.title.includes(search);
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
