export interface Task {
  task_id?: number;
  member_id?: number;
  project_id?: number;
  task_name?: string;
  start_date?: string;
  end_date?: string;
}

export interface ProjectTasks {
  project_id?: number;
  project_name?: string;
  tasks: Task[];
}
