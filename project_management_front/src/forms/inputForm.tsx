// src/components/InputField.js
import React from 'react';

interface InputProps {
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const InputField: React.FC<InputProps> = ({ label, type, name, value, onChange}) => {
  

  // Si se desea implementar una validacion podemos presentar el mensaje de error con esta prop -error

  return (
    <div className=''>
      <label className=''>{label}</label> {/* Muestra la etiqueta del campo */}
      <input className='' type={type} value={value} onChange={onChange} /> {/* Campo de entrada */}
    </div>
  );
}

export default InputField;