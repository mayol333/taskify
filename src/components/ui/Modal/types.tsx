import { ReactNode } from "react";

export interface ModalProps {
    modalOpen: boolean;
    handleModalClose: VoidFunction;
    children: ReactNode;
}
