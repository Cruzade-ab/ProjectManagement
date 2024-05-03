import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import BaseLayout from "./components/home/baseLayout";
import ProjectContainer from "./components/project/projectContainer";
import ProjectCard from "./components/project/projectDetails";

export default function App() {
    const [filter, setFilter] = useState('all');
    const [editMode, setEditMode] = useState(false);

    const changeEditMode = () => setEditMode(!editMode);
    const handleFilterChange = (filterOption) => setFilter(filterOption);

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <BaseLayout 
                        filter={filter} 
                        handleFilterChange={handleFilterChange} 
                        editMode={editMode} 
                        changeEditMode={changeEditMode}>
                        <ProjectContainer />
                    </BaseLayout>
                }>
                    {/* Define route for the project container */}
                    <Route index element={<ProjectContainer filter={filter} editMode={editMode} />} />
                    {/* Define route for individual project details */}
                    <Route path="project/:projectId" element={<ProjectCard />} />
                </Route>
            </Routes>
        </Router>
    );
}
