import { ModalProps } from "./types";
export const Modal = ({
    modalOpen,
    handleModalClose,
    children,
}: ModalProps) => {
    if (!modalOpen) {
        return null;
    }
    return (
        <div className="modal-background">
            <div className="modal">
                <span onClick={handleModalClose} className="modal-close-button">
                    X
                </span>
                {children}
            </div>
        </div>
    );
};
