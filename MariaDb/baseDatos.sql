-- */
-- Table 1: projects
CREATE TABLE IF NOT EXISTS projects (
	project_id INT AUTO_INCREMENT PRIMARY KEY,
	project_name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	status VARCHAR(50) NOT NULL
);
/*
Tabla: team_members
Propósito: Esta tabla almacena información sobre los miembros pertenecientes a un proyecto.
 
Campos:
- member_id: Un identificador único para cada miembro. Es un primary Key.
- member_name: El nombre del miembro. No puede ser nulo.
- role: Rol designado al miembro. No puede ser nulo.
- proyect_id: El miembro referencia a un proyecto en específico. No puede ser nulo. Es un foreign key.
*/
 
-- Table 2: team_members
CREATE TABLE IF NOT EXISTS team_members (
	member_id INT AUTO_INCREMENT PRIMARY KEY,
	member_name VARCHAR(255) NOT NULL,
	role VARCHAR(100) NOT NULL,
	project_id INT NOT NULL,
	FOREIGN KEY (project_id) REFERENCES projects(project_id)
);
 
/*
Tabla: tasks
Propósito: Esta tabla almacena información sobre los tasks de los miembros.
 
Campos:
- task_id: Un identificador único para cada task. Es un primary Key.
- task_name: El nombre de cada task. No puede ser nulo.
- start_date: La fecha de inicio del task. No puede ser nulo.
- end_date: La fecha de finalización del task. No puede ser nulo.
- member_id: El task referencia a un miembro en específico. No puede ser nulo. Es un foreign key.
- proyect_id: El task referencia a un proyecto en específico. No puede ser nulo. Es un foreign key.
*/
-- Table 3: tasks
CREATE TABLE IF NOT EXISTS tasks (
	task_id INT AUTO_INCREMENT PRIMARY KEY,
	task_name VARCHAR(255) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	project_id INT NOT NULL,
	member_id INT NOT NULL,
	FOREIGN KEY (project_id) REFERENCES projects(project_id),
	FOREIGN KEY (member_id) REFERENCES team_members(member_id)
);
