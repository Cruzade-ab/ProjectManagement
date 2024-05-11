import React, { useEffect, useState } from 'react';
import {Task, ProjectTasks} from '../../interfaces/Task';
import TasksProject from '../Cards/tasks/TaskProyect';
import { Project } from '../../interfaces/Project';

interface TasksContainerProps {
    selectedProject: Project | null;
}

const TasksContainers: React.FC<TasksContainerProps> = ({selectedProject}) => {
    const [projectTasks, setProjectTasks] = useState<ProjectTasks[]>([]); 

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/get_all_tasks')
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
        <div>
            {projectTasks.filter(task => 
                selectedProject === null || task.project_id === selectedProject.project_id
            ).map(filteredTask => (
                <TasksProject key={filteredTask.project_id} projectTask={filteredTask} />
            ))}
        </div>
        </>
    );
    
};

export default TasksContainers;
