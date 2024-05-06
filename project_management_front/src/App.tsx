import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsContainer from './components/Containers/ProjectContainer';



function App() {
  return (
    <Router>
      <div>
        {/* You can add a Navbar here if you want */}
        <Routes>
          <Route path="/" element={<ProjectsContainer />} />
          <Route path="/members" element={<TasksContainer />} /> 
          <Route path="/tasks" element={<MembersContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
