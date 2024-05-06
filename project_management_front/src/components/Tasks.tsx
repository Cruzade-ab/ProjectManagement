import { useEffect, useState } from "react";

const ProjectTasks: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      fetch(`/api/tasks/${projectId}`)
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(console.error);
    }, [projectId]);
  
    return (
      <div>
        Tasks
      </div>
    );
  };

export default ProjectTasks