// src/components/ProjectForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from './SchemaValidation';
import { Member } from '../../interfaces/Member';
import { useNavigate } from 'react-router-dom';

interface MemberFormProps {
  defaultValues: Member;
  isEditing: boolean;
  onSubmitSuccess: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ defaultValues, isEditing , onSubmitSuccess}) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Member>({
    resolver: zodResolver(taskSchema),
    defaultValues
  });


  React.useEffect(() => {
    console.log('Resetting form with defaultValues:', defaultValues);
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Member> = async data => {
    console.log('Form data', data);

    const url = isEditing ? `http://127.0.0.1:5000/api/update_member/${defaultValues.member_id}` : `http://127.0.0.1:5000/api/new_member/${defaultValues.project_id}`;
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
        navigate('/blank');
        navigate(-1);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error procesando tu solicitud.');
    }

    

  };

  console.log('Form errors:', errors);


  return (
<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
  <h1>{isEditing ? 'Updating Member' : 'Create Member'}</h1>

  <div className="mb-3">
    <label htmlFor="project_id" className="form-label">Project Id</label>
    <input {...register('project_id')} type="text" className={`form-control ${errors.project_id ? 'is-invalid' : ''}`} id="project_id" />
    {errors.project_id && <div className="invalid-feedback">{errors.project_id.message}</div>}
  </div> 
<div className="mb-3">
    <label htmlFor="member_id" className="form-label">Member Id</label>
    <input {...register('member_id')} type="text" className={`form-control ${errors.member_id ? 'is-invalid' : ''}`} id="member_id" />
    {errors.member_id && <div className="invalid-feedback">{errors.member_id.message}</div>}
  </div>

  <input type="submit" className="btn btn-primary" onClick={() => console.log('Submit clicked')}>
  </input>
</form>

  

  );
};

export default MemberForm;
