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

    const url = isEditing ? `http://172.16.5.78:5000/projects/${defaultValues.project_id}` : 'http://172.16.5.78:5000/api';
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
<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
  <div className="mb-3">
    <label htmlFor="task_name" className="form-label">Task Name</label>
    <input {...register('task_name')} type="text" className={`form-control ${errors.task_name ? 'is-invalid' : ''}`} id="task_name" />
    {errors.task_name && <div className="invalid-feedback">{errors.task_name.message}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="start_date" className="form-label">Start Date</label>
    <input {...register('start_date')} type="date" className={`form-control ${errors.start_date ? 'is-invalid' : ''}`} />
    {errors.start_date && <div className="invalid-feedback">{errors.start_date.message}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="end_date" className="form-label">End Date</label>
    <input {...register('end_date')} type="date" className={`form-control ${errors.end_date ? 'is-invalid' : ''}`} id="end_date" />
    {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
  </div>

  <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Create'}</button>
</form>

  

  );
};

export default TaskForm;
