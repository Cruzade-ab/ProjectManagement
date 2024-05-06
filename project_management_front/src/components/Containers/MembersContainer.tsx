import React, { useEffect, useState } from 'react';
import MemberCard from '../Cards/MemberCard';
import Member from '../../interfaces/Member';
import NavbarMember from '../Navbar/MemberNavbar';


const MembersContainer: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]); 

    useEffect(() => {
        fetch('http://172.16.5.78:5000/api/get_all_members')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.projects)) {
                    setMembers(data.projects);
                    console.log('Projects Fetch: ', data.projects);
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
                <MemberCard key={member.member_id} member={member} />
            ))}
        </div>
        </>
    );
};

export default MembersContainer;
