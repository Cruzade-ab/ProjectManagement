import React from 'react';
import Project from '../../interfaces/Project';
import { Link } from 'react-router-dom';
import './css/style.css';

interface ProjectProps {
  project: Project;
  tittle?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {



  return (

    <div className="card mb-4">
    <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{project.project_name}</h5>
            <div>
                <button className="btn btn-primary" style={{ marginRight: '15px' }}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger"><i className="fas fa-trash"></i></button>
            </div>
        </div>
        <hr />
        <p className="card-text">Description: {project.description}</p>
        <p className="card-text">Status: {project.status}</p>
    </div>
</div>
    
  );
};

export default ProjectCard;
