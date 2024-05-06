import React from 'react';
import Project from '../interfaces/Project';
import { Link } from 'react-router-dom';

interface ProjectProps {
  project: Project;
}

const ProjectComponent: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="project">
      <Link to={`/project/${project.project_id}`}>
        <h3>{project.project_name} (ID: {project.project_id})</h3>
      </Link>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
    </div>
  );
};

export default ProjectComponent;
