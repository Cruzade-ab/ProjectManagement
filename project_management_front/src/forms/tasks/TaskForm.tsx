// src/components/ProjectForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from './SchemaValidation';
import {Task }from '../../interfaces/Task';

interface TaskFormProps {
  defaultValues: Task;
  isEditing: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ defaultValues, isEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues
  });


  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Task> = async data => {
    console.log('Form data', data);

    const url = isEditing ? `http://127.0.0.1:5000/projects/${defaultValues.project_id}` : 'http://127.0.0.1:5000/api';
    const method = isEditing ? 'PUT' : 'POST';


    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const api_response = await response.json();  
        console.log('Success:', api_response);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error procesando tu solicitud.');
    }

    

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Project Name</label>
      <input {...register('task_name')} />
      {errors.task_name && <p>{errors.task_name.message}</p>}

     {/* Agregar los otros field para llenar los tasks */}

      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default TaskForm;
