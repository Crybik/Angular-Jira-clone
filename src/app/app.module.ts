import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { IconComponent } from './components/icon/icon.component';

// Services
import { TaskService } from './services/task.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    BoardComponent,
    TaskCardComponent,
    TaskDetailComponent,
    CreateTaskModalComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule
  ],
  providers: [
    TaskService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
