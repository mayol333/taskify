import { SelectProps } from "./types";
export const Select = ({
    placeholder,
    options,
    handleSelect,
    value,
}: SelectProps) => {
    return (
        <select value={value} className="select" onChange={handleSelect}>
            <option value="" selected>
                {placeholder}
            </option>
            {options.map(({ label, value }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
};
