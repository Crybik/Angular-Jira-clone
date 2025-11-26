import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 'proj-1',
      name: 'FlowBoard',
      key: 'PROJ',
      description: 'Main product development',
      color: '#6366F1',
      icon: 'folder',
      createdAt: new Date('2024-01-01')
    },
    {
      id: 'proj-2',
      name: 'Marketing Site',
      key: 'MKTG',
      description: 'Company website redesign',
      color: '#EC4899',
      icon: 'globe',
      createdAt: new Date('2024-01-05')
    },
    {
      id: 'proj-3',
      name: 'Mobile App',
      key: 'MOBI',
      description: 'iOS and Android development',
      color: '#14B8A6',
      icon: 'device-mobile',
      createdAt: new Date('2024-01-10')
    }
  ];

  private projectsSubject = new BehaviorSubject<Project[]>(this.projects);
  projects$ = this.projectsSubject.asObservable();

  private activeProjectSubject = new BehaviorSubject<Project>(this.projects[0]);
  activeProject$ = this.activeProjectSubject.asObservable();

  constructor() {}

  setActiveProject(project: Project): void {
    this.activeProjectSubject.next(project);
  }

  getActiveProject(): Project {
    return this.activeProjectSubject.getValue();
  }

  addProject(project: Omit<Project, 'id' | 'createdAt'>): void {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date()
    };
    this.projects.push(newProject);
    this.projectsSubject.next([...this.projects]);
  }
}

