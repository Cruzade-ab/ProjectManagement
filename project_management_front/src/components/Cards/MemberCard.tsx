import React, { useEffect, useState } from "react";
import Member from "../../interfaces/Member";

interface MembersProps {
  member: Member;
  
}


const MemberCard: React.FC<MembersProps> = ({ member }) => {


  return (
    <div className="member">
        <h3>{member.member_name} (ID: {member.member_id})</h3>
        <p>{member.role}</p>

    </div>
  );
};

export default MemberCard