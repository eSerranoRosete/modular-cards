import { useState } from "react";

export const useIsOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, onOpen, onClose, onOpenChange };
};
