import React, { useEffect, useState } from "react";
import {ProjectTasks, Task} from "../../../interfaces/Task";
import TaskCard from "./TaskCard";
import Modal from "../../Modal/modal";
import TaskForm from "../../../forms/tasks/TaskForm";
import '../css/style.css';
import { Project } from "../../../interfaces/Project";



interface ProjectTasksProps {
  projectTask: ProjectTasks;
}


const TasksProject: React.FC<ProjectTasksProps> = ({ projectTask}) => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  useEffect(() => {
    setTasks(projectTask.tasks);
  }, [projectTask.tasks]);

  return (
    <div className="tasks">
    <div className="card mb-4">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{projectTask.project_name}</h5>
                <div>
                    <button className="btn btn-primary px-5" onClick={openModal}>Add</button>
                </div>
            </div>
            <hr />
            <br></br>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskForm isEditing={false} defaultValues={{project_id: projectTask.project_id}} onSubmitSuccess={closeModal} handleCloseEditModal={closeModal}></TaskForm>
            </Modal>

            <div>
                {tasks.map(task => (
                    <TaskCard key={task.task_id} task={task}  project_id={projectTask.project_id} />
                ))}
            </div>
        </div>
    </div>
</div>
  );
};

export default TasksProject