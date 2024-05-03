import React from 'react';
import FilterComponent from './filterComponent';
import EditMode from './editComponent';

function BaseLayout({ children, filter, handleFilterChange, editMode, changeEditMode }) {
  return (
    <div className="vh-100 d-flex flex-col justify-content-center align-items-center">
        <div className="w-30 border d-flex flex-col justify-content-center align-items-center">
            <div>Project Controls</div>
            <FilterComponent filter={filter} handleFilterChange={handleFilterChange} />
            <EditMode editMode={editMode} changeEditMode={changeEditMode} />
        </div>
        <div className="w-70 border">
            {children}  {/* This will render the nested route component */}
        </div>
    </div>
  );
}

export default BaseLayout;
