import React, { useEffect, useState } from "react";
import Member from "../../interfaces/Member";
import './css/style.css';

interface MembersProps {
  member: Member;
}


const MemberCard: React.FC<MembersProps> = ({ member }) => {
  return (
    <div className="card mb-4">
    <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{member.member_name}</h5>
            <div>
                <button className="btn btn-primary" style={{ marginRight: '15px' }}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger"><i className="fas fa-trash"></i></button>
            </div>
        </div>
        <hr />
        <p className="card-text">Role: {member.role}</p>
    </div>
</div>

  );
  
};

export default MemberCard