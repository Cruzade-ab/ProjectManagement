import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectContainer from './components/ProjectContainer';
import ProjectDetail from './components/ProjectPage';  

function App() {
  return (
    <Router>
      <div>
        {/* You can add a Navbar here if you want */}
        <Routes>
          <Route path="/" element={<ProjectContainer />} /> 
          <Route path="/project/:id" element={<ProjectDetail />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
