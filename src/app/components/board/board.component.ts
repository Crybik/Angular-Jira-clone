import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Column, Task } from '../../models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  columns: Column[] = [];
  showCreateModal = false;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.columns$.subscribe(columns => {
      this.columns = columns;
    });

    this.taskService.selectedTask$.subscribe(task => {
      this.selectedTask = task;
    });
  }

  getConnectedLists(): string[] {
    return this.columns.map(col => col.id);
  }

  onDrop(event: CdkDragDrop<Task[]>, column: Column): void {
    if (event.previousContainer === event.container) {
      // Reorder within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.reorderTask(column.id, event.previousIndex, event.currentIndex);
    } else {
      // Move to different column
      const task = event.previousContainer.data[event.previousIndex];
      const fromColumnId = event.previousContainer.id;
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      this.taskService.moveTask(task.id, fromColumnId, column.id, event.currentIndex);
    }
  }

  openTaskDetail(task: Task): void {
    this.taskService.selectTask(task);
  }

  closeTaskDetail(): void {
    this.taskService.selectTask(null);
  }

  toggleCreateModal(): void {
    this.showCreateModal = !this.showCreateModal;
  }

  onTaskCreated(): void {
    this.showCreateModal = false;
  }

  getTaskCount(column: Column): number {
    return column.tasks.length;
  }

  getTotalPoints(column: Column): number {
    return column.tasks.reduce((sum, task) => sum + (task.storyPoints || 0), 0);
  }
}

