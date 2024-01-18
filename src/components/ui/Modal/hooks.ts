import { useState } from "react";
export const useModalState = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    return {
        modalOpen,
        handleModalOpen,
        handleModalClose,
    };

};