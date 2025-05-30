import { useState } from "react";

const useModal = () => {
  // Modal visibility state
  const [isOpen, setIsOpen] = useState(false);

  // Modal control functions
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
