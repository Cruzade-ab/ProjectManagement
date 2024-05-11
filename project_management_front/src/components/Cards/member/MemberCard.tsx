import React, { useEffect, useState } from "react";
import {Member} from "../../../interfaces/Member";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/modal";
import MemberForm from "../../../forms/members/MemberForm";

interface MembersProps {
  member: Member;
  project_id?: number | undefined;

}


const MemberCard: React.FC<MembersProps> = ({ member, project_id }) => {
  const navigate = useNavigate()
  
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


  const openEditModal = () => {
    console.log("Opening Edit Modal");
    setEditModalOpen(true);
  };
  
  const closeModal = () => setEditModalOpen(false);


  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    const url = `http://127.0.0.1:5000/api/delete_member/${member.member_id}`

    try {
      const response = await fetch (url,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if(response.ok){
        console.log('Success deleting Member')
        navigate('/blank');
        navigate(-1)
      }else{
        console.log('Error deleting Member')
      }

    } catch (error) {
      console.error('Failed to delete project:', error);
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
        <Modal  isOpen={isEditModalOpen} onClose={closeModal}>
        <MemberForm isEditing={true} 
            defaultValues={{
              member: {
              member_id: member.member_id,
              member_name: member.member_name,
              role: member.role
              },
              project_id: project_id
        }}
          onSubmitSuccess={closeModal}></MemberForm>
      </Modal>
        

        <button className="btn btn-danger" onClick={openDeleteModal}><i className="fas fa-trash"></i></button>
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <div>
              <h1>
                Delete Member
              </h1>
              <p>
                Are you sure to delete the member {member.member_name}?
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

</>
  );
};

export default MemberCard