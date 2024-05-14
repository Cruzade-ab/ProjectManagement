import React, { useState } from "react";
import { Project, SelectProject } from "../../interfaces/Project"
import { Link } from "react-router-dom";
import Modal from "../Modal/modal";
import ProjectForm from "../../forms/projects/ProjectForm";
import "../Cards/css/style.css";




interface NavbarPropos {
    projects: Project[];
    setSelectedProject: (project: Project | null) => void;
}
const Navbar: React.FC<NavbarPropos> = ({ projects, setSelectedProject }) => {
    const [isModalOpen, setModalOpen] = useState(false);


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        if (selectedId === "all") {
            setSelectedProject(null);
        } else {
            const selectedProject = projects.find(project => project.project_id?.toString() === selectedId);
            if (selectedProject) {
                setSelectedProject(selectedProject);
            }
        }
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar" >
                <div className="container-fluid">
                    <Link className="navbar-brand text-color navbar-brand-bold" to="/">Project Management</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-color" aria-current="page" to="/">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-color" aria-current="page" to="/members">Members</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-color" aria-current="page" to="/tasks">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <select className="form-select" onChange={handleProjectSelect} aria-label="Select project">
                                    <option value="all">All Projects</option>
                                    {projects.map((project) => (
                                        <option key={project.project_id} value={project.project_id}>{project.project_name}</option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                        <button className="btn add-project-btn" onClick={openModal}>Add Project</button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <ProjectForm isEditing={false} defaultValues={{ project_name: '', description: '', status: '' }} onSubmitSuccess={closeModal} handleCloseEditModal={closeModal}/>
                        </Modal>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar