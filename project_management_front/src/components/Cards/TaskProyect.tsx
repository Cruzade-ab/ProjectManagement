import React, { useEffect, useState } from "react";
import {ProjectTasks, Task} from "../../interfaces/Task";
import TaskCard from "./TaskCard";
import Modal from "../Modal/modal";
import TaskForm from "../../forms/tasks/TaskForm";

interface ProjectTasksProps {
  projectTask: ProjectTasks;
  
}


const TasksProject: React.FC<ProjectTasksProps> = ({ projectTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  useEffect(() => {
    setTasks(projectTask.tasks);
  }, [projectTask.tasks]);

  return (
    <div className="tasks">
        <div>
            Project Name: {projectTask.project_name}
        </div>

        <button onClick={openModal}>
            Add Task
        </button>
        <Modal  isOpen={isModalOpen} onClose={closeModal}>
            <TaskForm isEditing={false} defaultValues={{}}></TaskForm>
        </Modal>

        <div>
            {tasks.map(task => (
                <TaskCard key={task.task_id} task={task} />
            ))}
        </div>
        
    </div>
  );
};

export default TasksProject