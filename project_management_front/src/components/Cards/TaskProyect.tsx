import React, { useEffect, useState } from "react";
import {ProjectTasks, Task} from "../../interfaces/Task";
import TaskCard from "./TaskCard";

interface ProjectTasksProps {
  projectTask: ProjectTasks;
  
}


const TasksProject: React.FC<ProjectTasksProps> = ({ projectTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]); 

  
  useEffect(() => {
    setTasks(projectTask.tasks);
  }, [projectTask.tasks]);

  return (
    <div className="tasks">
        <div>
            Project Name: {projectTask.project_name}
        </div>

        <div>
            {tasks.map(task => (
                <TaskCard key={task.task_id} task={task} />
            ))}
        </div>
        
    </div>
  );
};

export default TasksProject