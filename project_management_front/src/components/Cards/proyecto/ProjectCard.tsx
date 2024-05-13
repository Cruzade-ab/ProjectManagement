import React, { useState } from 'react';
import {Project }from '../../../interfaces/Project';
import Modal from '../../Modal/modal';
import ProjectForm from '../../../forms/projects/ProjectForm';
import '../css/style.css';
import { json } from 'stream/consumers';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../Modal/ErrorModal';
interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  //
  const navigate = useNavigate()
  
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  
  const openEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleCloseErrorModal = () => setIsErrorModalOpen(false);
  const closeModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };
  


  const handleDelete = async () => { 
    const url = `http://127.0.0.1:5000/api/delete_project/${project.project_id}`
    setDeleteModalOpen(false)

    try {
      const response = await fetch (url,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json();

      if(response.ok){
        console.log('Success deleting Project')
        navigate('/blank');
        navigate(-1)
      }else{
        console.log('Error deleting Project')
        setErrorMessage(data.error);
        setIsErrorModalOpen(true);
      }

    } catch (error) {
      console.error('Failed to delete project:', error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setIsErrorModalOpen(true);
    }
  }
  


  return (

    <>
    <div className="card mb-4">
    <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{project.project_name}</h5>
            <div>
                <button className="btn btn-primary" style={{ marginRight: '15px' }} onClick={openEditModal}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger" onClick={openDeleteModal}><i className="fas fa-trash"></i></button>
            </div>
        </div>
        <hr />
        <p className="card-text">Description: {project.description}</p>
        <p className="card-text">Status: {project.status}</p>

        <Modal  isOpen={isEditModalOpen} onClose={handleCloseEditModal} >
          <ProjectForm 
            isEditing={true} 
            defaultValues={
                {
                  project_name: project.project_name, 
                  description: project.description, 
                  status: project.status, 
                  project_id: project.project_id
                }} 
            onSubmitSuccess={handleCloseDeleteModal}
            handleCloseEditModal={closeModal} />
        </Modal>


        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
  <div className="d-flex justify-content-center">
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <div>
        <h1>Delete Project</h1>
        <p>Are you sure to delete the project {project.project_name}?</p>
        <button className="btn btn-danger btn-lg me-2" onClick={handleDelete} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
          <i className="fas fa-trash me-1"></i>Delete
        </button>
        <button className="btn btn-secondary btn-lg" onClick={handleCloseDeleteModal} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
</Modal>


    </div>
</div>

<ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />
</> 
  );
};

export default ProjectCard;
