import { InputProps } from "./types";
import { Icon } from "../Icon/Icon";
export const Input = ({
    placeholder,
    isSearch,
    label,
    error,
    value,
    handleSearch,
}: InputProps) => {
    return (
        <div>
            {!!label && (
                <label className="input-label" htmlFor="input">
                    {label}
                </label>
            )}
            <div className="input-container">
                <input
                    className="input"
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={handleSearch}
                    id="input"
                />
                {isSearch && <Icon type="search" className="search" />}
            </div>
            {!!error && <p className="input-error">{error}</p>}
        </div>
    );
};
