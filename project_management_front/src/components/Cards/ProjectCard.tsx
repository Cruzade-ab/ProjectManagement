import React, { useState } from 'react';
import Project from '../../interfaces/Project';
import Modal from '../Modal/modal';
import ProjectForm from '../../forms/projects/ProjectForm';
interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  


  return (
    <div className="project">
        <h3>{project.project_name} (ID: {project.project_id})</h3>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>

      <button onClick={openModal}>
        Edit
      </button>
      <Modal  isOpen={isModalOpen} onClose={closeModal}>
        <ProjectForm isEditing={true} defaultValues={{project_name: project.project_name, description: project.description, status: project.status, project_id: project.project_id}}></ProjectForm>
      </Modal>

    </div>
  );
};

export default ProjectCard;
