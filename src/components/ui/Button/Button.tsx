import { PropsWithChildren } from "react";

export const Button = ({ children }: PropsWithChildren) => {
    return <button className="button">{children}</button>;
};
