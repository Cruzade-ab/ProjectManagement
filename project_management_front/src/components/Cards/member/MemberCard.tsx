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
    <div className="row mb-4 w-100">
  <div className="col">
    <div className="row align-items-center">
      <div className="col">
        <p className="card-text"><strong></strong> {member.member_name}</p>
      </div>
      <div className="col">
        <p className="card-text"><strong>Id: </strong> {member.member_id}</p>
      </div>
      <div className="col">
        <p className="card-text"><strong>Role:</strong> {member.role}</p>
      </div>
      <div className="col-auto">
        <div className="d-flex align-items-center" style={{ marginTop: '-15px' }}>
        <button className="btn btn-primary" style={{ marginRight: '15px' }} onClick={openEditModal}><i className="fas fa-edit"></i></button>
        <Modal  isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <MemberForm isEditing={true} 
            defaultValues={{
              member: {
              member_id: member.member_id,
              member_name: member.member_name,
              role: member.role
              },
              project_id: project_id
        }}
          onSubmitSuccess={handleCloseDeleteModal} />
      </Modal>
        

        <button className="btn btn-danger" onClick={openDeleteModal}><i className="fas fa-trash"></i></button>
        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
            <div>
              <h1>
                Delete Member
              </h1>
              <p>
                Are you sure to delete the member {member.member_name}?
              </p>
              <button onClick={(handleDelete)}>
                yes
              </button>
              <button onClick={handleCloseDeleteModal}>
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

<ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />

</>
  );
};

export default MemberCard