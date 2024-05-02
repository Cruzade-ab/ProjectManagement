export default function EditMode({editMode, changeEditMode}) {    
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
