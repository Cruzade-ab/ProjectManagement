// ErrorModal.tsx

import React from 'react';

interface ErrorModalProps {
  errorMessage: string;
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <div >
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
