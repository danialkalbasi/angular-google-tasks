import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';
import { TaskListsComponent } from './task-lists/task-lists.component';
import { TasksComponent } from './tasks/tasks.component';
import { ActionControlsComponent } from './action-controls/action-controls.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  declarations: [
    ToolbarComponent,
    TaskListsComponent,
    TasksComponent,
    ActionControlsComponent,
    TaskEditorComponent
  ],
  exports: [
    ToolbarComponent,
    TaskListsComponent,
    TasksComponent,
    ActionControlsComponent
  ],
  entryComponents: [TaskEditorComponent]
})
export class ComponentsModule { }
