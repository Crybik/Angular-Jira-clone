import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Column, Subtask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private columns: Column[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      status: 'backlog',
      color: '#6B7280',
      tasks: []
    },
    {
      id: 'todo',
      title: 'To Do',
      status: 'todo',
      color: '#3B82F6',
      tasks: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      status: 'in-progress',
      color: '#F59E0B',
      tasks: []
    },
    {
      id: 'review',
      title: 'In Review',
      status: 'review',
      color: '#8B5CF6',
      tasks: []
    },
    {
      id: 'done',
      title: 'Done',
      status: 'done',
      color: '#10B981',
      tasks: []
    }
  ];

  private columnsSubject = new BehaviorSubject<Column[]>(this.columns);
  columns$ = this.columnsSubject.asObservable();

  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();

  constructor() {
    this.loadSampleTasks();
  }

  private loadSampleTasks(): void {
    const sampleTasks: Task[] = [
      {
        id: 'PROJ-1',
        title: 'Design new dashboard layout',
        description: 'Create a modern, intuitive dashboard layout with widgets for key metrics and quick actions.',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Sarah Chen',
        assigneeAvatar: 'SC',
        labels: ['design', 'ui/ux'],
        subtasks: [
          { id: 's1', title: 'Create wireframes', completed: true },
          { id: 's2', title: 'Design mockups in Figma', completed: true },
          { id: 's3', title: 'Get stakeholder approval', completed: false },
          { id: 's4', title: 'Prepare assets for dev', completed: false }
        ],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 8
      },
      {
        id: 'PROJ-2',
        title: 'Implement user authentication',
        description: 'Set up secure authentication system with JWT tokens, including login, registration, and password reset.',
        status: 'todo',
        priority: 'urgent',
        assignee: 'Mike Johnson',
        assigneeAvatar: 'MJ',
        labels: ['backend', 'security'],
        subtasks: [
          { id: 's1', title: 'Setup JWT middleware', completed: false },
          { id: 's2', title: 'Create login endpoint', completed: false },
          { id: 's3', title: 'Add password hashing', completed: false }
        ],
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 13
      },
      {
        id: 'PROJ-3',
        title: 'Database optimization',
        description: 'Optimize database queries and add proper indexing for better performance.',
        status: 'review',
        priority: 'medium',
        assignee: 'Alex Rivera',
        assigneeAvatar: 'AR',
        labels: ['backend', 'performance'],
        subtasks: [
          { id: 's1', title: 'Analyze slow queries', completed: true },
          { id: 's2', title: 'Add indexes', completed: true },
          { id: 's3', title: 'Test performance improvements', completed: false }
        ],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 5
      },
      {
        id: 'PROJ-4',
        title: 'Mobile responsive design',
        description: 'Ensure all pages are fully responsive and work well on mobile devices.',
        status: 'backlog',
        priority: 'medium',
        assignee: 'Emma Wilson',
        assigneeAvatar: 'EW',
        labels: ['frontend', 'mobile'],
        subtasks: [],
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 8
      },
      {
        id: 'PROJ-5',
        title: 'API documentation',
        description: 'Create comprehensive API documentation using Swagger/OpenAPI.',
        status: 'done',
        priority: 'low',
        assignee: 'James Lee',
        assigneeAvatar: 'JL',
        labels: ['documentation'],
        subtasks: [
          { id: 's1', title: 'Document auth endpoints', completed: true },
          { id: 's2', title: 'Document user endpoints', completed: true },
          { id: 's3', title: 'Add example requests', completed: true }
        ],
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 3
      },
      {
        id: 'PROJ-6',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment pipeline using GitHub Actions.',
        status: 'todo',
        priority: 'high',
        assignee: 'Sarah Chen',
        assigneeAvatar: 'SC',
        labels: ['devops', 'automation'],
        subtasks: [
          { id: 's1', title: 'Create workflow file', completed: false },
          { id: 's2', title: 'Add test stage', completed: false },
          { id: 's3', title: 'Configure deployment', completed: false }
        ],
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 5
      },
      {
        id: 'PROJ-7',
        title: 'User profile settings',
        description: 'Allow users to update their profile information and preferences.',
        status: 'backlog',
        priority: 'low',
        labels: ['frontend', 'feature'],
        subtasks: [],
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 3
      },
      {
        id: 'PROJ-8',
        title: 'Notification system',
        description: 'Implement real-time notifications for task updates and mentions.',
        status: 'in-progress',
        priority: 'medium',
        assignee: 'Mike Johnson',
        assigneeAvatar: 'MJ',
        labels: ['backend', 'feature'],
        subtasks: [
          { id: 's1', title: 'Setup WebSocket connection', completed: true },
          { id: 's2', title: 'Create notification service', completed: false },
          { id: 's3', title: 'Build notification UI', completed: false }
        ],
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 8
      },
      {
        id: 'PROJ-9',
        title: 'Search functionality',
        description: 'Add global search to find tasks, projects, and team members quickly.',
        status: 'done',
        priority: 'medium',
        assignee: 'Alex Rivera',
        assigneeAvatar: 'AR',
        labels: ['frontend', 'feature'],
        subtasks: [
          { id: 's1', title: 'Create search component', completed: true },
          { id: 's2', title: 'Add keyboard shortcuts', completed: true }
        ],
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 5
      },
      {
        id: 'PROJ-10',
        title: 'Dark mode support',
        description: 'Add dark mode theme option with system preference detection.',
        status: 'review',
        priority: 'low',
        assignee: 'Emma Wilson',
        assigneeAvatar: 'EW',
        labels: ['frontend', 'ui/ux'],
        subtasks: [
          { id: 's1', title: 'Create dark theme variables', completed: true },
          { id: 's2', title: 'Add theme toggle', completed: true },
          { id: 's3', title: 'Test all components', completed: false }
        ],
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date(),
        projectId: 'proj-1',
        storyPoints: 5
      }
    ];

    // Distribute tasks to columns
    sampleTasks.forEach(task => {
      const column = this.columns.find(col => col.status === task.status);
      if (column) {
        column.tasks.push(task);
      }
    });

    this.columnsSubject.next(this.columns);
  }

  moveTask(taskId: string, fromColumnId: string, toColumnId: string, newIndex: number): void {
    const fromColumn = this.columns.find(col => col.id === fromColumnId);
    const toColumn = this.columns.find(col => col.id === toColumnId);

    if (!fromColumn || !toColumn) return;

    const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const [task] = fromColumn.tasks.splice(taskIndex, 1);
    task.status = toColumn.status;
    task.updatedAt = new Date();
    toColumn.tasks.splice(newIndex, 0, task);

    this.columnsSubject.next([...this.columns]);
  }

  reorderTask(columnId: string, previousIndex: number, currentIndex: number): void {
    const column = this.columns.find(col => col.id === columnId);
    if (!column) return;

    const [task] = column.tasks.splice(previousIndex, 1);
    column.tasks.splice(currentIndex, 0, task);

    this.columnsSubject.next([...this.columns]);
  }

  toggleSubtask(taskId: string, subtaskId: string): void {
    for (const column of this.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        const subtask = task.subtasks.find(s => s.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          task.updatedAt = new Date();
          this.columnsSubject.next([...this.columns]);
        }
        break;
      }
    }
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newTask: Task = {
      ...task,
      id: `PROJ-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const column = this.columns.find(col => col.status === task.status);
    if (column) {
      column.tasks.unshift(newTask);
      this.columnsSubject.next([...this.columns]);
    }
  }

  updateTask(taskId: string, updates: Partial<Task>): void {
    for (const column of this.columns) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = {
          ...column.tasks[taskIndex],
          ...updates,
          updatedAt: new Date()
        };
        this.columnsSubject.next([...this.columns]);
        break;
      }
    }
  }

  deleteTask(taskId: string): void {
    for (const column of this.columns) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        this.columnsSubject.next([...this.columns]);
        break;
      }
    }
  }

  selectTask(task: Task | null): void {
    this.selectedTaskSubject.next(task);
  }

  addSubtask(taskId: string, title: string): void {
    for (const column of this.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) {
        const newSubtask: Subtask = {
          id: `sub-${Date.now()}`,
          title,
          completed: false
        };
        task.subtasks.push(newSubtask);
        task.updatedAt = new Date();
        this.columnsSubject.next([...this.columns]);
        break;
      }
    }
  }
}

