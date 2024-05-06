import React from 'react';
import Project from '../../interfaces/Project';
import { Link } from 'react-router-dom';

interface ProjectProps {
  project: Project;
  tittle?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {



  return (
    <div className="project">
        <h3>{project.project_name} (ID: {project.project_id})</h3>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>

      <button>
        
      </button>

    </div>
  );
};

export default ProjectCard;
