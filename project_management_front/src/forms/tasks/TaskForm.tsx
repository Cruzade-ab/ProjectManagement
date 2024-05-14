// src/components/ProjectForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from './SchemaValidation';
import {Task }from '../../interfaces/Task';
import { useNavigate } from 'react-router-dom';

interface TaskFormProps {
  defaultValues: {
    task?: Task;
    project_id?: number;
  };
  isEditing: boolean;
  onSubmitSuccess: () => void;
  handleCloseEditModal: () => void;
}

interface MemberList {
  member_id: number;
  member_name: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ defaultValues, isEditing, onSubmitSuccess, handleCloseEditModal }) => {
  const [members, setMembers] = useState<MemberList[]>([]);
  const { task, project_id } = defaultValues;
  const navigate = useNavigate()

  React.useEffect(() => {
    if (project_id) {
      fetch(`http://127.0.0.1:5000/api/get_members_by_project/${project_id}`)
        .then(response => response.json())
        .then(setMembers)
        .catch(console.error);
    }
  }, [project_id]);


  //Formating Date 
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`; 
  };

  
  const formattedTaskValues: Task = {
    ...task,
    project_id: project_id,
    start_date: formatDate(task?.start_date),
    end_date: formatDate(task?.end_date),
  };

  

  // console.log("Initial default values:", defaultValues);


  interface FormValues extends Task {
    project_id?: number;
  }
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      ...formattedTaskValues,
      project_id 
    }
  });


  React.useEffect(() => {
    console.log('Resetting form with defaultValues:', defaultValues);
    reset({
      ...formattedTaskValues,
      project_id
    });
  }, [defaultValues, reset]);

  console.log("Initial default values for form:", {
    ...formattedTaskValues,
    project_id
  })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log('Form data', data);
  
    const url = isEditing ? `http://127.0.0.1:5000/api/update_task/${data.task_id}` : `http://127.0.0.1:5000/api/new_task/${data.project_id}/${data.member_id}`;
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
        onSubmitSuccess();
        navigate('blank');
        navigate(-1)

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error procesando tu solicitud.');
    }

    

  };

  console.log('Form errors:', errors);


  return (
<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
  <h1 className="mb-4 text-center text-color-two">{isEditing ? 'Edit Task' : 'Create Task'}</h1>
  <div className="mb-3">
    <label htmlFor="task_name" className="form-label text-color-two">Task Name</label>
    <input {...register('task_name')} type="text" className={`form-control ${errors.task_name ? 'is-invalid' : ''}`} id="task_name" />
    {errors.task_name && <div className="invalid-feedback">{errors.task_name.message}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="start_date" className="form-label text-color-two">Start Date</label>
    <input {...register('start_date')} type="date" className={`form-control ${errors.start_date ? 'is-invalid' : ''}`} />
    {errors.start_date && <div className="invalid-feedback">{errors.start_date.message}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="end_date" className="form-label text-color-two">End Date</label>
    <input {...register('end_date')} type="date" className={`form-control ${errors.end_date ? 'is-invalid' : ''}`} id="end_date" />
    {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="member_id">Member</label>
    <select {...register('member_id')} className={`form-select ${errors.member_id ? 'is-invalid' : ''}`}>
      <option value="">Select a Member</option>
      {members.map(member => (
        <option key={member.member_id} value={member.member_id}>{member.member_name}</option>
      ))}
    </select>
    {errors.member_id && <div className="invalid-feedback">{errors.member_id.message}</div>}
  </div>
  <div className="mt-3">
    <input type="submit" className="btn btn-primary me-3 btn-lg" onClick={() => console.log('Submit clicked')}></input>
    <button onClick={handleCloseEditModal} className="btn btn-secondary me-3 btn-lg">Cancel</button>
  </div>
</form>

  

  );
};

export default TaskForm;
