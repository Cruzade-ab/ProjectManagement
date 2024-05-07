import React, { useEffect, useState } from 'react';
import TaskCard from '../Cards/TaskCard';
import NavbarTask from '../Navbar/TaskNavbar';
import {Task, ProjectTasks} from '../../interfaces/Task';
import TasksProject from '../Cards/TaskProyect';


const TasksContainers: React.FC = () => {
    const [projectTasks, setProjectTasks] = useState<ProjectTasks[]>([]); 

    useEffect(() => {
        fetch('http://10.0.0.73:5000/api/get_all_tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.data)) {
                    setProjectTasks(data.data);
                    console.log('Task Fetch: ', data.data);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setProjectTasks([]);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setProjectTasks([]);
            });
    }, []);

    return (
        <>
        <NavbarTask task={projectTasks} />
        
        <div>
            {projectTasks.map(projectTask => (
                <TasksProject key={projectTask.project_id} projectTask={projectTask} />
            ))}
        </div>
        </>
    );
    
};

export default TasksContainers;
