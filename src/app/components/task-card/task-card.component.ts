import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;

  priorityConfig: { [key: string]: { icon: string; color: string; bg: string } } = {
    'urgent': { icon: 'arrow-up', color: '#dc2626', bg: '#fef2f2' },
    'high': { icon: 'arrow-up', color: '#f97316', bg: '#fff7ed' },
    'medium': { icon: 'arrow-down', color: '#eab308', bg: '#fefce8' },
    'low': { icon: 'arrow-down', color: '#22c55e', bg: '#f0fdf4' }
  };

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

  get completedSubtasks(): number {
    return this.task.subtasks.filter(s => s.completed).length;
  }

  get totalSubtasks(): number {
    return this.task.subtasks.length;
  }

  get subtaskProgress(): number {
    if (this.totalSubtasks === 0) return 0;
    return (this.completedSubtasks / this.totalSubtasks) * 100;
  }

  getPriorityConfig(priority: string) {
    return this.priorityConfig[priority] || this.priorityConfig['medium'];
  }

  getLabelStyle(label: string) {
    const config = this.labelColors[label] || { bg: '#f3f4f6', color: '#4b5563' };
    return {
      background: config.bg,
      color: config.color
    };
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}

