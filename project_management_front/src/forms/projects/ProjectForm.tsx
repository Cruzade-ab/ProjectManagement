// src/components/ProjectForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from './SchemaValidation';
import Project from '../../interfaces/Project';

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
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Project> = async data => {
    console.log('Form data', data);

    const url = isEditing ? `http://172.16.5.78:5000/api/update_project.${defaultValues.project_id}` : 'http://172.16.5.78:5000/api/new_projects';
    const method = isEditing ? 'POST' : 'POST';

    console.log("Direction Fetch",url)


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
      <input {...register('project_name')} />
      {errors.project_name && <p>{errors.project_name.message}</p>}

      <label>Description</label>
      <input {...register('description')} />
      {errors.description && <p>{errors.description.message}</p>}

      <label>Status</label>
      <input {...register('status')} />
      {errors.status && <p>{errors.status.message}</p>}

      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ProjectForm;
