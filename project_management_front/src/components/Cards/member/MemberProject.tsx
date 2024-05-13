import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import Modal from "../../Modal/modal";
import MemberForm from "../../../forms/members/MemberForm";
import '../css/style.css';
import { Member, MemberTeam } from "../../../interfaces/Member";


interface ProjectTeamProps {
  projectTeam: MemberTeam;
}


const MemberProject: React.FC<ProjectTeamProps> = ({ projectTeam }) => {
  const [members, setMembers] = useState<Member[]>([])
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  useEffect(() => {
    setMembers(projectTeam.members || []);
  }, [projectTeam.members]);

  return (
    <div className="members">
    <div className="card mb-4">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{projectTeam.project_name}</h5>
                <div>
                    <button className="btn btn-primary px-5" onClick={openModal}>Add</button>
                </div>
            </div>
            <hr />
            <br></br>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <MemberForm isEditing={false} defaultValues={{project_id:projectTeam.project_id}} onSubmitSuccess={closeModal} handleCloseEditModal={closeModal}></MemberForm>
            </Modal>

            <div>
                {members.map(member => (
                    <MemberCard key={member.member_id} member={member}  project_id={projectTeam.project_id}/>
                ))}
            </div>
        </div>
    </div>
</div>
  );
};

export default MemberProject