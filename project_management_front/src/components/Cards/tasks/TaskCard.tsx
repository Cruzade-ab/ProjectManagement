import React, { useEffect, useState } from "react";
import {Task} from "../../../interfaces/Task";
import Modal from "../../Modal/modal";
import TaskForm from "../../../forms/tasks/TaskForm";
import '../css/style.css';
import { useNavigate } from "react-router-dom";

interface TasksProps {
  task: Task;
  project_id?: number | undefined;
}


const TaskCard: React.FC<TasksProps> = ({ task, project_id}) => {
  console.log("The task ", task.task_name, "of projecft", project_id)
  const navigate = useNavigate()
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    const url = `http://127.0.0.1:5000/api/delete_task/${task.task_id}`

    try {
      const response = await fetch (url,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if(response.ok){
        console.log('Success deleting Task')
        navigate('/blank');
        navigate(-1)
      }else{
        console.log('Error deleting Task')
      }

    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }

  console.log("Project ID before passing to TaskForm:", project_id);


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
        

        <button className="btn btn-danger" onClick={openDeleteModal}><i className="fas fa-trash"></i></button>
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <div>
              <h1>
                Delete Task
              </h1>
              <p>
                Are you sure to delete the task {task.task_name}, by the member {task.member_name}
              </p>
              <button onClick={handleDelete}>
                yes
              </button>
              <button onClick={closeDeleteModal}>
                no
              </button>
            </div>
        </Modal>
        </div>
      </div>
    </div>
  </div>
  <hr />
</div>
<Modal  isOpen={isModalOpen} onClose={closeModal}>
  <TaskForm isEditing={true} 
    defaultValues={{
    task: {
      task_name: task.task_name,
      start_date: task.start_date,
      end_date: task.end_date,
      task_id: task.task_id,
      member_id: task.member_id,
    },
    project_id: project_id
  }}
    onSubmitSuccess={closeModal}></TaskForm>
</Modal>
</>

  );
};

export default TaskCard