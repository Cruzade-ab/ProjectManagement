import React, { useEffect, useState } from 'react';
import { Project } from '../../interfaces/Project';
import { MemberTeam } from '../../interfaces/Member';
import MemberProject from '../Cards/member/MemberProject';


interface MembersContainerProps {
    selectedProject: Project | null;
}

const MembersContainer: React.FC<MembersContainerProps> = ({ selectedProject }) => {
    const [members, setMembers] = useState<MemberTeam[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/get_all_members')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.members)) {
                    setMembers(data.members);
                    console.log('Members Fetch: ', data.members);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setMembers([]);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setMembers([]);
            });
    }, []);

    return (
        <>
            <div>
                {members.filter(member =>
                    selectedProject === null || member.project_id === selectedProject.project_id
                ).map(filteredMember => (
                    <MemberProject key={filteredMember.project_id} projectTeam={filteredMember} />
                ))}
            </div>
        </>
    );
};

export default MembersContainer;
