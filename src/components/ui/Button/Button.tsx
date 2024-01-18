import { ButtonProps } from "./types";
export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
};
