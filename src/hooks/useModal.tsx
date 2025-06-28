import { useState } from 'react';

interface ModalHook {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function useModal(): ModalHook {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
}
