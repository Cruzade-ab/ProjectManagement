// src/components/ProjectForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from './SchemaValidation';
import {Project} from '../../interfaces/Project';

interface ProjectFormProps {
  defaultValues: Project;
  isEditing: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ defaultValues, isEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues
  });


  React.useEffect(() => {
    console.log('Resetting form with defaultValues:', defaultValues);
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Project> = async data => {
    console.log('Attempting to submit form', data);

    const url = isEditing ? `http://127.0.0.1:5000/api/update_project/${defaultValues.project_id}` : 'http://127.0.0.1:5000/api/new_project';
    const method = isEditing ? 'POST' : 'POST';

    console.log('Making API request to:', url);

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
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <h1>{isEditing ? 'Updating Project' : 'Create Project'}</h1>
    <div className="mb-3">
      <label htmlFor="project_name" className="form-label">Project Name</label>
      <input {...register('project_name')} type="text" className={`form-control ${errors.project_name ? 'is-invalid' : ''}`} id="project_name" />
      {errors.project_name && <div className="invalid-feedback">{errors.project_name.message}</div>}
    </div>

    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input {...register('description')} type="text" className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="description" />
      {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
    </div>

    <div className="mb-3">
      <label htmlFor="status" className="form-label">Status</label>
      <input {...register('status')} type="text" className={`form-control ${errors.status ? 'is-invalid' : ''}`} id="status" />
      {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
    </div>

    <input type="submit" className="btn btn-primary" onClick={() => console.log('Submit clicked')}>
    </input>
  </form>
  </>
  );
};

export default ProjectForm;
