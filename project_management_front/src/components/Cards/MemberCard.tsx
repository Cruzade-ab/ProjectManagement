import { useEffect, useState } from "react";

const MemberCard: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [members, setMembers] = useState([]);
  
    useEffect(() => {
      fetch(`/api/members/${projectId}`)
        .then(response => response.json())
        .then(data => setMembers(data))
        .catch(console.error);
    }, [projectId]);
  
    return (
      <div>
        Members
      </div>
    );
  };

export default MemberCard