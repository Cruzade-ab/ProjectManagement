import ProjectContainer from "./components/projectContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";


function FilterComponent({filter, handleFilterChange}) {
    return (
      <div className="vh-100%">
        <h2>Filtro Actual: {filter}</h2>
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Progress')}>Progress</button>
        <button onClick={() => handleFilterChange('Complete')}>Complete</button>
        <button onClick={() => handleFilterChange('Deleted')}>Deleted</button>
      </div>
    );
  }

  function EditMode({editMode, changeEditMode}) {    
    return (
        <div>
            {editMode ? (
                <div>
                    <p>Modo de edición ACTIVO</p>
                </div>
            ) : (
                <div>
                    <p>Modo de edición NO ACTIVO</p>
                </div>
            )}
            <button onClick={changeEditMode}>
                {editMode ? 'Desactivar Modo de Edición' : 'Activar Modo de Edición'}
            </button>
        </div>
    );
}


export default function App(){

    const [filter, setFilter] = useState('all');
    const [editMode, setEditMode] = useState(false);

    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    const handleFilterChange = (filterOption) => {
        console.log('Filtering products by: ', {filterOption})
        setFilter(filterOption);
      };




    return (
   
    <div className="vh-100 d-flex flex-col justify-content-center align-items-center">

        <div className="w-30 border d-dlex flex-col justify-content-center align-items-center">
            <div className="" >
                Project Controls
            </div>

            <FilterComponent filter={filter} handleFilterChange={handleFilterChange} />
            <EditMode editMode={editMode} changeEditMode={changeEditMode}/>
        </div>

        <div className="w-70 border">
            <h1>Proyectos En Sistema</h1>
            <ProjectContainer filter={filter} editMode={editMode} />
        </div>

        
    </div>
  
    )
    
 
}