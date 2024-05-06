import React, { useEffect, useState } from 'react';
import TaskCard from '../Cards/TaskCard';
import Navbar from '../Navbar';
import Task from '../../interfaces/Task';


const TasksContainers: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]); 

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
                    setTasks(data.projects);
                    console.log('Task Fetch: ', data.projects);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setTasks([]);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setTasks([]);
            });
    }, []);

    return (
        <>
        <Navbar />
        
        <div>
            {tasks.map(task => (
                <TaskCard key={task.task_id} task={task} />
            ))}
        </div>
        </>
    );
    
};

export default TasksContainers;
