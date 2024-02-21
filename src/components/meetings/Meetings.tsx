import { useState, ChangeEventHandler } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { Input } from "../ui/Input/Input";
import { Select } from "../ui/Select/Select";
import { Meeting } from "../ui/Meeting/Meeting";

export const Meetings = () => {
    const [searchMeeting, setMeetingSearch] = useState("");
    const { form, setForm } = useState("");
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setMeetingSearch(value);
    };
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setForm({ ...form, taskType: value });
    };
    return (
        <section className="meetings-section">
            <div className="meetings-header-container">
                <h1 className="meetings-headliner">Meetings</h1>
                <div className="meetings-inputs-container">
                    <Select
                        placeholder="Upcoming"
                        options={[
                            { label: "Fitness App", value: "fitnessApp" },
                            { label: "New Payment", value: "newPayment" },
                            { label: "Social Media", value: "socialMedia" },
                        ]}
                        handleSelect={handleSelect}
                        value=""
                    ></Select>
                    <Input
                        placeholder="Search"
                        isSearch={true}
                        value={searchMeeting}
                        onChange={handleSearch}
                    ></Input>
                    <Button>
                        <Icon type="plus" className="plus-icon" />
                        New Meeting
                    </Button>
                </div>
            </div>
            <div>
                <Meeting
                    title={"Social Media Web"}
                    date={"23/12/2024"}
                    startTime={"12:30am"}
                    endTime={"2:00pm"}
                />
            </div>
        </section>
    );
};
