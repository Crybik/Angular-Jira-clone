import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  title = '';
  description = '';
  status: Task['status'] = 'todo';
  priority: Task['priority'] = 'medium';
  assignee = '';
  storyPoints: number | undefined;
  selectedLabels: string[] = [];

  statusOptions = [
    { value: 'backlog', label: 'Backlog', color: '#6B7280' },
    { value: 'todo', label: 'To Do', color: '#3B82F6' },
    { value: 'in-progress', label: 'In Progress', color: '#F59E0B' },
    { value: 'review', label: 'In Review', color: '#8B5CF6' },
    { value: 'done', label: 'Done', color: '#10B981' }
  ];

  priorityOptions = [
    { value: 'low', label: 'Low', color: '#22c55e' },
    { value: 'medium', label: 'Medium', color: '#eab308' },
    { value: 'high', label: 'High', color: '#f97316' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626' }
  ];

  availableLabels = [
    'design', 'ui/ux', 'backend', 'frontend', 'security',
    'performance', 'documentation', 'devops', 'automation', 'feature', 'mobile'
  ];

  teamMembers = [
    { name: 'Sarah Chen', avatar: 'SC' },
    { name: 'Mike Johnson', avatar: 'MJ' },
    { name: 'Alex Rivera', avatar: 'AR' },
    { name: 'Emma Wilson', avatar: 'EW' },
    { name: 'James Lee', avatar: 'JL' }
  ];

  constructor(private taskService: TaskService) {}

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  toggleLabel(label: string): void {
    const index = this.selectedLabels.indexOf(label);
    if (index === -1) {
      this.selectedLabels.push(label);
    } else {
      this.selectedLabels.splice(index, 1);
    }
  }

  isLabelSelected(label: string): boolean {
    return this.selectedLabels.includes(label);
  }

  getAvatarForAssignee(name: string): string {
    const member = this.teamMembers.find(m => m.name === name);
    return member ? member.avatar : name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  createTask(): void {
    if (!this.title.trim()) return;

    const assigneeAvatar = this.assignee ? this.getAvatarForAssignee(this.assignee) : undefined;

    this.taskService.addTask({
      title: this.title.trim(),
      description: this.description.trim(),
      status: this.status,
      priority: this.priority,
      assignee: this.assignee || undefined,
      assigneeAvatar: assigneeAvatar,
      labels: this.selectedLabels,
      subtasks: [],
      projectId: 'proj-1',
      storyPoints: this.storyPoints
    });

    this.created.emit();
  }
}

