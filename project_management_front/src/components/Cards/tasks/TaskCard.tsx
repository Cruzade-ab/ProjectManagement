import React, { useEffect, useState } from "react";
import {Task} from "../../../interfaces/Task";
import Modal from "../../Modal/modal";
import TaskForm from "../../../forms/tasks/TaskForm";
import '../css/style.css';

interface TasksProps {
  task: Task;
  
}


const TaskCard: React.FC<TasksProps> = ({ task }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
<div className="row mb-4 w-100">
  <div className="col">
    <div className="row align-items-center">
      <div className="col">
        <p className="card-text"><strong></strong> {task.task_name}</p>
      </div>
      <div className="col">
        <p className="card-text"><strong>Start date:</strong> {task.start_date}</p>
      </div>
      <div className="col">
        <p className="card-text"><strong>End date:</strong> {task.end_date}</p>
      </div>
      <div className="col">
        <p className="card-text"><strong>Member:</strong> {task.start_date}</p>
      </div>
      <div className="col-auto">
        <div className="d-flex align-items-center" style={{ marginTop: '-15px' }}>
        <button className="btn btn-primary" style={{ marginRight: '15px' }} onClick={openModal}><i className="fas fa-edit"></i></button>

          <button className="btn btn-danger"><i className="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  </div>
  <hr />
</div>


<Modal  isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm isEditing={true} defaultValues={{task_name: task.task_name, start_date: task.start_date, end_date: task.end_date, project_id: task.task_id}}></TaskForm>
      </Modal>
</>

  );
};

export default TaskCard