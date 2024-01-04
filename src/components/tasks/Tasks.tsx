import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
export const Tasks = () => {
    return (
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
    );
};
