import ProjectContainer from "./components/projectContainer";
import EditMode from "./components/editComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterComponent from "./components/filterComponent";

import React, { useState } from "react";



  

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