import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/task.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() createTask = new EventEmitter<void>();
  
  activeProject: Project | null = null;
  searchQuery = '';
  showNotifications = false;
  notificationCount = 5;

  teamMembers = [
    { name: 'Sarah Chen', avatar: 'SC', color: '#6366f1' },
    { name: 'Mike Johnson', avatar: 'MJ', color: '#10b981' },
    { name: 'Alex Rivera', avatar: 'AR', color: '#f59e0b' },
    { name: 'Emma Wilson', avatar: 'EW', color: '#ec4899' }
  ];

  filterOptions = [
    { label: 'All Tasks', value: 'all', active: true },
    { label: 'My Tasks', value: 'mine', active: false },
    { label: 'Unassigned', value: 'unassigned', active: false }
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.activeProject$.subscribe(project => {
      this.activeProject = project;
    });
  }

  onCreateTask(): void {
    this.createTask.emit();
  }

  toggleFilter(option: any): void {
    this.filterOptions.forEach(o => o.active = false);
    option.active = true;
  }
}

