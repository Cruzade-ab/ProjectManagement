import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Project from '../interfaces/Project';
import MemberDetails from './Members';
import ProjectTasks from './Tasks';
import Navbar from './Navbar';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
      fetch(`http://127.0.0.1:5000/api/projects/${id}`)
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(console.error);
    
  }, [id]);


  if (!id) { 
    return <div>Invalid project ID.</div>;
  }

  if (!project) {
    return <div>Loading... </div>;
  }

  console.log("Project Fetch: ", project)

  return (
    <>
      <Navbar/>
      <div>
        <h1>{project.project_name}</h1>
        <p>{project.description}</p>
        <p>Status: {project.status}</p>

        <MemberDetails projectId={id} />
        <ProjectTasks projectId={id} />
      </div>
    </>
    
  );
};

export default ProjectPage;
