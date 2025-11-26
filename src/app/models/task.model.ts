export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: Date;
  labels: string[];
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  storyPoints?: number;
}

export interface Column {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Date;
}

