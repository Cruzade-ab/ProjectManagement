import React, { useEffect, useState } from "react";
import {Task} from "../../interfaces/Task";
import Modal from "../Modal/modal";
import TaskForm from "../../forms/tasks/TaskForm";

interface TasksProps {
  task: Task;
  
}


const TaskCard: React.FC<TasksProps> = ({ task }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="tasks">
        <h3>{task.task_name} (ID: {task.task_id})</h3>
        <p>Start Date:{task.start_date}</p>
        <p>End Date:{task.end_date}</p>

        <button onClick={openModal}>
          update
        </button>
        <Modal  isOpen={isModalOpen} onClose={closeModal}>
          <TaskForm isEditing={true} defaultValues={{
            task_id: task.task_id,
            member_id: task.member_id,
            project_id: task.project_id,
            task_name: task.task_name,
            start_date: task.start_date,
            end_date: task.end_date
          }}></TaskForm>
        </Modal>
        <button>
          delete
        </button>

    </div>
  );
};

export default TaskCard