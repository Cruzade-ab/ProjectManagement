import React, { useEffect, useState } from 'react';
import ProjectCard from '../Cards/proyecto/ProjectCard';
import { Project } from '../../interfaces/Project';

interface ProjectsContainerProps {
    selectedProject: Project | null;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({selectedProject}) => {
   
    const [projects, setProjects] = useState<Project[]>([]); 

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/get_all_projects')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.projects)) {
                    setProjects(data.projects);
                    console.log('Projects Fetch: ', data.projects);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setProjects([]);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setProjects([]);
            });
    }, []);

    return (
        <>
        <div>
            {projects.filter(project => 
                selectedProject === null || project.project_id === selectedProject.project_id
            ).map(filteredProject => (
                <ProjectCard key={filteredProject.project_id} project={filteredProject} />
            ))}
        </div>
        </>
    );
};

export default ProjectsContainer;
