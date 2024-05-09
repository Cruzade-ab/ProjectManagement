import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>

<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
  {children}
  <button onClick={onClose} type="button" className="btn btn-outline-dark position-absolute top-0 end-0">
    <i className="bi bi-x"></i> 
  </button>
</div>

</>
    
  );
};

export default Modal;
