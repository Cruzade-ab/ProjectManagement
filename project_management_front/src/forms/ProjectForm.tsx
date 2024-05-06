import React, { useState } from 'react';
import InputField from './inputForm';

// Definir tipos para las props del componente ProjectForm
type ProjectFormProps = {
  initialValues: { id: number; projectName: string; description: string; status: string;}; // Ejemplo de tipo para initialValues, puedes ajustarlo según tu estructura
  isEditing: boolean;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ initialValues, isEditing }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = isEditing ? `http://localhost:3000/projects/${initialValues.id}` : 'http://localhost:3000/projects';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      console.log('Success:', data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Nombre del Proyecto"
        type="text"
        name="projectName"
        value={formData.projectName}
        onChange={handleChange}
      />
      <InputField
        label="Descripción"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <InputField
        label="Status"
        type="text" // Agregar el tipo correspondiente
        name="status" // Agregar el name correspondiente
        value={formData.status} // Agregar el valor correspondiente
        onChange={handleChange}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProjectForm;
