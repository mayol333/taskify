export interface InputProps {
    placeholder: string;
    isSearch: boolean;
    label?: string;
    error?: string;
    value: string;
    onChange: () => void;
}