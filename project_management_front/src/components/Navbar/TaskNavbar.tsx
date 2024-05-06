import Task from "../../interfaces/Task";

interface NavbarPropos {
    task: Task[];
  }


  const NavbarTask: React.FC<NavbarPropos> = ({task}) => {


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Project Management</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filter
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">Projects</a></li>
                                    <li><a className="dropdown-item" href="/members">Members</a></li>
                                    <li><a className="dropdown-item" href="/tasks">Tasks</a></li>
                                </ul>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default NavbarTask