import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsContainer from './components/Containers/ProjectContainer';
import MembersContainer from './components/Containers/MembersContainer';
import TasksContainers from './components/Containers/TasksContainers';
import Navbar from './components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { Project } from './interfaces/Project';



function App() {
  const [projects, setProjects] = useState<Project[]>([]); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
      fetch('http://127.0.0.1:5000/api/get_all_projects')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              if (Array.isArray(data.projects)) {
                  setProjects(data.projects);
                  console.log('Projects Fetch: ', data.projects);
              } else {
                  console.error("Fetched data is not an array:", data);
                  setProjects([]);
              }
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
              setProjects([]);
          });
  }, []);


  return (
    <Router>
      <div>
        <Navbar projects={projects} setSelectedProject={setSelectedProject}></Navbar>
        <Routes>
          <Route path="/" element={<ProjectsContainer selectedProject={selectedProject}/>} />
          <Route path="/tasks" element={<TasksContainers selectedProject={selectedProject}/>} /> 
          <Route path="/members" element={<MembersContainer selectedProject={selectedProject}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
