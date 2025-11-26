import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/task.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  projects: Project[] = [];
  activeProject: Project | null = null;
  isCollapsed = false;
  expandedSections: { [key: string]: boolean } = {
    projects: true,
    planning: true
  };

  navItems = [
    { icon: 'home', label: 'Home', active: false },
    { icon: 'inbox', label: 'My Work', active: false },
    { icon: 'view-boards', label: 'Board', active: true },
    { icon: 'calendar', label: 'Timeline', active: false },
    { icon: 'chart-bar', label: 'Reports', active: false }
  ];

  planningItems = [
    { icon: 'lightning-bolt', label: 'Sprints', count: 3 },
    { icon: 'clipboard-list', label: 'Backlog', count: 12 },
    { icon: 'document', label: 'Pages', count: 8 }
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe(projects => {
      this.projects = projects;
    });

    this.projectService.activeProject$.subscribe(project => {
      this.activeProject = project;
    });
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  selectProject(project: Project): void {
    this.projectService.setActiveProject(project);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

