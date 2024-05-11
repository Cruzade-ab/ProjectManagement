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

  //Formating Date 

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`; // Format to YYYY-MM-DD
  };

  
  const defaultValuesFormatted: Task = {
    ...defaultValues,
    start_date: formatDate(defaultValues.start_date),
    end_date: formatDate(defaultValues.end_date),
  };
  







  //
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValuesFormatted
  });


  React.useEffect(() => {
    console.log('Resetting form with defaultValues:', defaultValuesFormatted);
    reset(defaultValuesFormatted);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Task> = async (data: Task) => {
    console.log('Form data', data);

    const url = isEditing ? `http://127.0.0.1:5000/api/update_task/${defaultValues.task_id}` : `http://127.0.0.1:5000/api/new_task/${defaultValues.project_id}/${defaultValues.member_id}`;
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

  console.log('Form errors:', errors);


  return (
<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
  <h1>{isEditing ? 'Updating Task' : 'Create Tasks'}</h1>
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

  <div className="mb-3">
    <label htmlFor="project_id" className="form-label">Project Id</label>
    <input {...register('project_id')} type="text" className={`form-control ${errors.project_id ? 'is-invalid' : ''}`} id="project_id" />
    {errors.project_id && <div className="invalid-feedback">{errors.project_id.message}</div>}
  </div> 
{/* <div className="mb-3">
    <label htmlFor="member_id" className="form-label">Member Id</label>
    <input {...register('member_id')} type="text" className={`form-control ${errors.member_id ? 'is-invalid' : ''}`} id="member_id" />
    {errors.member_id && <div className="invalid-feedback">{errors.member_id.message}</div>}
  </div> */}

  <input type="submit" className="btn btn-primary" onClick={() => console.log('Submit clicked')}>
  </input>
</form>

  

  );
};

export default TaskForm;
