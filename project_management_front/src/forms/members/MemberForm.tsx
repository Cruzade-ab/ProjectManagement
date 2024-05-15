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
  handleCloseEditModal: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ defaultValues, isEditing , onSubmitSuccess, handleCloseEditModal}) => {
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

    const url = isEditing ? `http://172.16.5.78:5000/api/update_member/${defaultValues.project_id}/${defaultValues.member?.member_id}` : `http://172.16.5.78:5000/api/add_members/${defaultValues.project_id}`;
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
<form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-100">
  <h1 className='text-center text-color-two'>{isEditing ? 'Edit Member' : 'Add Member'}</h1>

  <input type="hidden" {...register('project_id')} />

  <div className="mb-3">
    <label htmlFor="member_name" className="form-label text-color-two">Member Name</label>
    <input {...register('member_name')} type="text" className={`form-control ${errors.member_name ? 'is-invalid' : ''}`} id="member_name" />
    {errors.member_name && <div className="invalid-feedback">{errors.member_name.message}</div>}
  </div> 
  <div className="mb-3">
    <label htmlFor="role" className="form-label text-color-two">Role</label>
    <input {...register('role')} type="text" className={`form-control ${errors.role ? 'is-invalid' : ''}`} id="role" />
    {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
  </div>

  <div className="mt-3">
    <input type="submit" className="btn btn-primary me-3 btn-lg" onClick={() => console.log('Submit clicked')}></input>
    <button onClick={handleCloseEditModal} className="btn btn-secondary me-3 btn-lg">Cancel</button>
  </div>
</form>

  

  );
};

export default MemberForm;
