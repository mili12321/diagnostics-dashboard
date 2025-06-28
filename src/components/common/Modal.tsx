import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`modal ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
