import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, Subtask } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();

  newSubtaskTitle = '';
  isEditing = false;
  editedTitle = '';
  editedDescription = '';

  priorityOptions = [
    { value: 'low', label: 'Low', icon: 'arrow-down', color: '#22c55e' },
    { value: 'medium', label: 'Medium', icon: 'arrow-down', color: '#eab308' },
    { value: 'high', label: 'High', icon: 'arrow-up', color: '#f97316' },
    { value: 'urgent', label: 'Urgent', icon: 'arrow-up', color: '#dc2626' }
  ];

  statusOptions = [
    { value: 'backlog', label: 'Backlog', color: '#6B7280' },
    { value: 'todo', label: 'To Do', color: '#3B82F6' },
    { value: 'in-progress', label: 'In Progress', color: '#F59E0B' },
    { value: 'review', label: 'In Review', color: '#8B5CF6' },
    { value: 'done', label: 'Done', color: '#10B981' }
  ];

  labelColors: { [key: string]: { bg: string; color: string } } = {
    'design': { bg: '#fce7f3', color: '#be185d' },
    'ui/ux': { bg: '#e0e7ff', color: '#4338ca' },
    'backend': { bg: '#d1fae5', color: '#047857' },
    'frontend': { bg: '#cffafe', color: '#0e7490' },
    'security': { bg: '#fee2e2', color: '#b91c1c' },
    'performance': { bg: '#fef3c7', color: '#b45309' },
    'documentation': { bg: '#f3f4f6', color: '#4b5563' },
    'devops': { bg: '#ede9fe', color: '#6d28d9' },
    'automation': { bg: '#dbeafe', color: '#1d4ed8' },
    'feature': { bg: '#dcfce7', color: '#15803d' },
    'mobile': { bg: '#ffedd5', color: '#c2410c' }
  };

  constructor(private taskService: TaskService) {}

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  toggleSubtask(subtask: Subtask): void {
    this.taskService.toggleSubtask(this.task.id, subtask.id);
  }

  addSubtask(): void {
    if (this.newSubtaskTitle.trim()) {
      this.taskService.addSubtask(this.task.id, this.newSubtaskTitle.trim());
      this.newSubtaskTitle = '';
    }
  }

  onSubtaskKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addSubtask();
    }
  }

  get completedSubtasks(): number {
    return this.task.subtasks.filter(s => s.completed).length;
  }

  get subtaskProgress(): number {
    if (this.task.subtasks.length === 0) return 0;
    return (this.completedSubtasks / this.task.subtasks.length) * 100;
  }

  getLabelStyle(label: string) {
    const config = this.labelColors[label] || { bg: '#f3f4f6', color: '#4b5563' };
    return {
      background: config.bg,
      color: config.color
    };
  }

  getStatusColor(status: string): string {
    const option = this.statusOptions.find(o => o.value === status);
    return option ? option.color : '#6B7280';
  }

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(o => o.value === status);
    return option ? option.label : status;
  }

  getPriorityColor(priority: string): string {
    const option = this.priorityOptions.find(o => o.value === priority);
    return option ? option.color : '#eab308';
  }

  getPriorityLabel(priority: string): string {
    const option = this.priorityOptions.find(o => o.value === priority);
    return option ? option.label : priority;
  }

  startEditing(): void {
    this.isEditing = true;
    this.editedTitle = this.task.title;
    this.editedDescription = this.task.description;
  }

  saveEdits(): void {
    this.taskService.updateTask(this.task.id, {
      title: this.editedTitle,
      description: this.editedDescription
    });
    this.isEditing = false;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  deleteTask(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id);
      this.onClose();
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

