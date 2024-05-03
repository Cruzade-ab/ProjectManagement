// src/components/ProjectForm.js
import React, { useState } from 'react';
import InputField from './inputField'; // Importa el componente InputField

function ProjectForm({ initialValues, isEditing }) {
    // initialValues: Cuando se quiera actualizar un proyecto se maneja este prop -initialValues como un objeto de los proyectos(interface)
    // onSubmit: Función que ejecuta el formulario.


    const [formData, setFormData] = useState(initialValues);
    // Estado del formulario con valores iniciales. (useState es un hook que nos permite manejar valores de variables para ejecutar logica sobre ellos)

    const handleChange = (event) => {
        // HandleChange reconoce los eventos en este caso de cambio, cada vez que se escriba se ejecuta esta funcion la cual
        // Actualiza el estado del formulario.

        setFormData({

            ...formData, // De actualizar un proyecto existente,  ...formData Conserva los valores actuales del formulario,
            [event.target.name]: event.target.value, // actualiza el campo modificado.
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();// Previene la recarga de la página.

        const url = isEditing ? `http://localhost:3000/member/${initialValues.id}` : 'http://localhost:3000/member';
        const method = isEditing ? 'PUT' : 'POST';
        // Se asigna el url correspondiente si se esta editando o por el contrario

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Network response was not ok.');

            const data = await response.json();  // Aquí manejas la respuesta de la API
            console.log('Success:', data);

            alert('Operación realizada con éxito!, - Only visable on Development -'); 
            // Cambiar A otro mensaje



            // Aquí puedes redirigir al usuario o actualizar el estado global si es necesario
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error procesando tu solicitud.');
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
            <button type="submit">Guardar</button> {/* Botón para enviar el formulario */}
        </form>
    );
}

export default ProjectForm;
