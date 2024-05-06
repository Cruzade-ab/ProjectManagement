import React, { useEffect, useState } from "react";
import Member from "../../interfaces/Member";

interface MembersProps {
  member: Member;
  
}


const MemberCard: React.FC<MembersProps> = ({ member }) => {


  return (
    <div className="project">
        <h3>{member.member_name} (ID: {member.member_id})</h3>

    </div>
  );
};

export default MemberCard