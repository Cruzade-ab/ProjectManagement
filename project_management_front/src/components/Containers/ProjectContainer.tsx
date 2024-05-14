import React, { useEffect, useState } from 'react';
import ProjectCard from '../Cards/proyecto/ProjectCard';
import { Project } from '../../interfaces/Project';

interface ProjectsContainerProps {
    selectedProject: Project | null;
    projects: Project[];
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({selectedProject,  projects}) => {
   
    return (
        <div className='container-fluid'>
            {projects.filter(project => 
                selectedProject === null || project.project_id === selectedProject.project_id
            ).map(filteredProject => (
                <ProjectCard key={filteredProject.project_id} project={filteredProject} />
            ))}
        </div>
    );
};

export default ProjectsContainer;
