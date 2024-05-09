import React, { useEffect, useState } from "react";
import {Task} from "../../interfaces/Task";
import './css/style.css';

interface TasksProps {
  task: Task;
  
}


const TaskCard: React.FC<TasksProps> = ({ task }) => {


  return (
    <div className="tasks">
        <h3>{task.task_name} (ID: {task.task_id})</h3>
        <p>Start Date:{task.start_date}</p>
        <p>End Date:{task.end_date}</p>

    </div>
  );
};

export default TaskCard