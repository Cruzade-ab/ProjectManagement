export default function FilterComponent({filter, handleFilterChange}) {
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




