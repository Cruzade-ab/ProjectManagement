import React, { useEffect, useState } from 'react';
import ProjectCard from '../Cards/proyecto/ProjectCard';
import { Project } from '../../interfaces/Project';

interface ProjectsContainerProps {
    selectedProject: Project | null;
    projects: Project[];
}
// Este componente manejara los props de projects y selectedProject que se le pasaran desde 
// el App.tsx
const ProjectsContainer: React.FC<ProjectsContainerProps> = ({selectedProject,  projects}) => {
   
    // Devuelve la lista de Projectos
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
