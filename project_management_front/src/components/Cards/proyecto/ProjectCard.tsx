import React, { useState } from 'react';
import {Project }from '../../../interfaces/Project';
import Modal from '../../Modal/modal';
import ProjectForm from '../../../forms/projects/ProjectForm';
import '../css/style.css';
import { json } from 'stream/consumers';
import { useNavigate } from 'react-router-dom';
interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  }
    
   


  const handleDelete = async () => {
    const url = `http://127.0.0.1:5000/api/delete_project/${project.project_id}`

    try {
      const response = await fetch (url,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if(response.ok){
        console.log('Success deleting Project')
        navigate('/blank');
        navigate(-1)
      }else{
        console.log('Error deleting Project')
      }

    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }


  return (

    <>
    <div className="card mb-4">
    <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{project.project_name}</h5>
            <div>
                <button className="btn btn-primary" style={{ marginRight: '15px' }} onClick={openModal}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger" onClick={() => handleDelete()}><i className="fas fa-trash"></i></button>
            </div>
        </div>
        <hr />
        <p className="card-text">Description: {project.description}</p>
        <p className="card-text">Status: {project.status}</p>

        <Modal  isOpen={isModalOpen} onClose={closeModal}>
        <ProjectForm isEditing={true} defaultValues={{project_name: project.project_name, description: project.description, status: project.status, project_id: project.project_id}} onSubmitSuccess={closeModal} ></ProjectForm>
        </Modal>
    </div>
</div>
</> 
  );
};

export default ProjectCard;
