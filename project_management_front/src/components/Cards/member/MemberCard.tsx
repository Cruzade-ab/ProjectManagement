import React, { useEffect, useState } from "react";
import {Member} from "../../../interfaces/Member";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/modal";
import MemberForm from "../../../forms/members/MemberForm";
import ErrorModal from "../../Modal/ErrorModal";

interface MembersProps {
  member: Member;
  project_id?: number | undefined;

}


const MemberCard: React.FC<MembersProps> = ({ member, project_id }) => {
  const navigate = useNavigate()

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


  const openEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleCloseErrorModal = () => setIsErrorModalOpen(false);


  const handleDelete = async () => {
    const url = `http://127.0.0.1:5000/api/delete_member/${member.member_id}`
    setDeleteModalOpen(false)

    try {
      const response = await fetch (url,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json();

      if(response.ok){
        console.log('Success deleting Member')
        navigate('/blank');
        navigate(-1)
      }else{
        console.log('Error deleting Member')
        setErrorMessage(data.error);
        setIsErrorModalOpen(true);
      }

    } catch (error) {
      console.error('Failed to delete member:', error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setIsErrorModalOpen(true);
    }
  }

  return (<>
<div className="card-body">
  <div className="row mb-4">
    <div className="col-md-3">
      <p className="card-text"><strong>Name:</strong> {member.member_name}</p>
    </div>
    <div className="col-md-3">
      <p className="card-text"><strong>Id:</strong> {member.member_id}</p>
    </div>
    <div className="col-md-3 mb-2">
      <p className="card-text"><strong>Role:</strong> {member.role}</p>
    </div>
    <div className="col-md-3">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn edit-button me-md-2 mb-2 mb-md-0 " onClick={openEditModal}>
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="btn btn-danger " onClick={openDeleteModal}>
          <i className="fas fa-trash"></i> Delete
        </button>

 

          {/* Edit modal */}
          <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
            <div className="d-flex flex-column align-items-center w-100">
              <MemberForm
                isEditing={true} 
                defaultValues={{
                  member: {
                    member_id: member.member_id,
                    member_name: member.member_name,
                    role: member.role
                  },
                  project_id: project_id
                }}
                onSubmitSuccess={handleCloseEditModal} 
                handleCloseEditModal={handleCloseEditModal}
              />
            </div>
          </Modal>

          {/* Delete modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
            <div className="d-flex justify-content-center">
              <div style={{ backgroundColor: 'white', padding: '20px' }}>
                <div>
                  <h1>Delete Member</h1>
                  <p>Are you sure to delete the member {member.member_name}?</p>
                  <button className="btn btn-danger btn-lg me-2" onClick={handleDelete} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
                    <i className="fas fa-trash me-1"></i>Delete
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={handleCloseDeleteModal} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
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
     <hr />
    {/* </div> */}
  {/* </div>
  <hr /> */}






<ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />

</>
  );
};

export default MemberCard