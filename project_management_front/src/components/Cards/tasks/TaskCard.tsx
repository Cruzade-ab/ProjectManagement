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

  console.log("Task: ", task.task_name)
  console.log("Start date is ", task.start_date, typeof(task.start_date))
  console.log("End date is ", task.end_date, typeof(task.end_date))


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
        <p className="card-text"><strong>Member:</strong> {task.member_id}</p>
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
        <TaskForm isEditing={true} defaultValues={{task_name: task.task_name, start_date: task.start_date, end_date: task.end_date, project_id: task.task_id, member_id: task.member_id}} onSubmitSuccess={closeModal}></TaskForm>
      </Modal>
</>

  );
};

export default TaskCard