// src/components/InputField.js
import React from 'react';

function InputField({ label, type, value, onChange, error }) {
  // Este componente toma varias props:
  // label: Etiqueta del campo de entrada.
  // type: Tipo de entrada, como 'text', 'email', 'number', etc.
  // value: Valor del campo de entrada, controlado por el componente padre.
  // onChange: Función que maneja el cambio de valor en el campo.

  // Si se desea implementar una validacion podemos presentar el mensaje de error con esta prop -error

  return (
    <div className=''>
      <label className=''>{label}</label> {/* Muestra la etiqueta del campo */}
      <input className='' type={type} value={value} onChange={onChange} /> {/* Campo de entrada */}
      {error && <span style={{ color: 'red' }}>{error}</span>} {/* Mensaje de error si existe */}
    </div>
  );
}

export default InputField;
