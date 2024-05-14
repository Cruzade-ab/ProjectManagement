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



  return (
    <>
<div className="card-body">
  <div className="row mb-4 align-items-start">
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>Name:</strong> {task.task_name}</p>
    </div>
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>Start Date:</strong> {task.start_date}</p>
    </div>
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>End Date:</strong> {task.end_date}</p>
    </div>
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>Member Id:</strong> {task.member_id}</p>
    </div>
    <div className="col-md-4 mt-3 p-0">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn edit-button me-md-2 mb-2 mb-md-0" onClick={openModal}>
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="btn btn-danger" onClick={openDeleteModal}>
          <i className="fas fa-trash"></i> Delete
        </button>



        

<Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
  <div className="d-flex justify-content-center">
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <div>
        <h1 className="text-color-two">Delete Task</h1>
        <p className="text-color-two">Are you sure you want to delete task {task.task_name}, by the member {task.member_name}?</p>
        <button className="btn btn-danger btn-lg me-2" onClick={handleDelete} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
          <i className="fas fa-trash me-1"></i>Delete
        </button>
        <button className="btn btn-secondary btn-lg" onClick={closeDeleteModal} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
</Modal>
        </div>
      </div>
    </div>
  </div> 
{/* </div>
{/* </div> */}
<hr />
<Modal isOpen={isModalOpen} onClose={closeModal}>
  <TaskForm 
    isEditing={true} 
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
    onSubmitSuccess={closeModal}
    handleCloseEditModal={closeModal} 
  />    
</Modal>

</>

  );
};

export default TaskCard