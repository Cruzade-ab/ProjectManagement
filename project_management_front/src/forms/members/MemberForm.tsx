// src/components/ProjectForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from './SchemaValidation';
import { Member } from '../../interfaces/Member';
import { useNavigate } from 'react-router-dom';

interface MemberFormProps {
  defaultValues:  {
    member?: Member;
    project_id?: number;
  };
  isEditing: boolean;
  onSubmitSuccess: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ defaultValues, isEditing , onSubmitSuccess}) => {
  const navigate = useNavigate()


  interface FormValues extends Member{
    project_id?: number;
  }


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      member_name: defaultValues.member?.member_name,
      role: defaultValues.member?.role,
      project_id: defaultValues.project_id,
      member_id: defaultValues.member?.member_id
    }
  });


  React.useEffect(() => {
    console.log('Resetting form with defaultValues:', defaultValues);
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Member> = async data => {
    console.log('Form data', data);

    const url = isEditing ? `http://127.0.0.1:5000/api/update_member/${defaultValues.project_id}/${defaultValues.member?.member_id}` : `http://127.0.0.1:5000/api/add_members/${defaultValues.project_id}`;
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

  <input type="hidden" {...register('project_id')} />

  <div className="mb-3">
    <label htmlFor="member_name" className="form-label">Member Name</label>
    <input {...register('member_name')} type="text" className={`form-control ${errors.member_name ? 'is-invalid' : ''}`} id="member_name" />
    {errors.member_name && <div className="invalid-feedback">{errors.member_name.message}</div>}
  </div> 
  <div className="mb-3">
    <label htmlFor="role" className="form-label">Role</label>
    <input {...register('role')} type="text" className={`form-control ${errors.role ? 'is-invalid' : ''}`} id="role" />
    {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
  </div>

  <input type="submit" className="btn btn-primary" onClick={() => console.log('Submit clicked')}>
  </input>
</form>

  

  );
};

export default MemberForm;
