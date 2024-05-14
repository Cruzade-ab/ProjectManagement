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
  <div style={{ backgroundColor: 'white', padding: '20px' }}>
    <div>
      <h4>{errorMessage}</h4>
      <br></br>
      <button onClick={onClose} className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '1.2rem' }}>Close</button>
    </div>
  </div>
</div>

  );
};

export default ErrorModal;
