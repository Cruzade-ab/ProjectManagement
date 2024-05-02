import { useEffect, useState } from "react";
import ProjectCard from "./projectCard";  

export default function ProjectContainer({ filter, editMode }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://172.16.5.78:5000/api/projects')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.projects)) {
                    setProjects(data.projects);
                    console.log('Projects Fetch: ', data.projects)
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

    const filterConditions = {
        'all': () => true,
        'active': project => project.status === 'Active',
        'complete': project => project.status === 'Complete',
        'progress': project => project.status === 'In Progress', 
        
    };

    
    const filteredProjects = projects.filter(project => filterConditions[filter.toLowerCase()]?.(project));

    return (
        <div>
            {filteredProjects.map(project => (
                <ProjectCard key={project.project_id} project={project} editMode={editMode} />
            ))}
        </div>
    );
}
