import { ChangeEventHandler } from "react";

export interface InputProps {
    placeholder: string;
    isSearch: boolean;
    label?: string;
    error?: string;
    value: string;
    handleSearch: ChangeEventHandler<HTMLInputElement>;
}
