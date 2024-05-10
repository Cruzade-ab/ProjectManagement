import React, { useEffect, useState } from 'react';
import MemberCard from '../Cards/member/MemberCard';
import {MemberTeam }from '../../interfaces/Member';
import NavbarMember from '../Navbar/MemberNavbar';
import MemberProject from '../Cards/member/MemberProject';


const MembersContainer: React.FC = () => {
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
       <NavbarMember member={members}/>
        
        <div>
            {members.map(member => (
                <MemberProject key={member.project_id} projectTeam={member} />
                
            ))}

    </div>
        </>
    );
};

export default MembersContainer;
