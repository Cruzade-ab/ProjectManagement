import React, { useEffect, useState } from 'react';
import ProjectComponent from './Project';
import Project from '../interfaces/Project';
import Navbar from './Navbar';


const ProjectContainer: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]); 

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/projects')
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
        <Navbar />
        
        <div>
            {projects.map(project => (
                <ProjectComponent key={project.project_id} project={project} />
            ))}
        </div>
        </>
    );
};

export default ProjectContainer;
