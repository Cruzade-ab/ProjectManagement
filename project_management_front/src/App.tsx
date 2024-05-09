import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsContainer from './components/Containers/ProjectContainer';
import MembersContainer from './components/Containers/MembersContainer';
import TasksContainers from './components/Containers/TasksContainers';
import React from 'react';



function App() {
  return (
    <Router>
      <div>
        {/* You can add a Navbar here if you want */}
        <Routes>
          <Route path="/" element={<ProjectsContainer />} />
          <Route path="/tasks" element={<TasksContainers />} /> 
          <Route path="/members" element={<MembersContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
