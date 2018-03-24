import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {
  /**
   * Keep tasks as an array
   */
  @Input() tasks: Array<any>;

  /**
   * It sends an update to parent whenever there is an update for a task
   */
  @Output() updateTask: EventEmitter<Object>;

  /**
   * Keep selected list
   */
  @Input() list: any;

  constructor(public dialog: MatDialog) {
    this.updateTask = new EventEmitter();
  }

  ngOnInit() {
    this.tasks = this.tasks || [];
    this.list = this.list || {};
  }

  /**
   * Open dialog with TaskEditorComponent component
   * @param task is the selected task which can be send to the dialog
   */
  openDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskEditorComponent, {
      width: '490px',
      disableClose: false
    });
  }

  /**
   * @returns formatted date string
   * @param date
   */
  stringToDate(date: string): string {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date ? new Date(date).toLocaleDateString('en-US', options).toString() : '';
  }

  /**
   * Triggers when the task edit get clicked
   * @param task is the task item
   */
  onTaskEdit(task: any): void {
    this.openDialog(task);
  }

  /**
   * toggle the task status
   * TODO: Remove the detechChanges and replace it with better solution
   * @param id is the task id
   */
  toggleIsDone(index: any): void {
    this.tasks[index].status = !this.tasks[index].status;
    const taskModified = this.tasks[index];
    this.updateSingleTask(taskModified, this.list.id);
  }

  /**
   * It fires whenever a task get updated
   * @param task is the selected task
   */
  updateSingleTask(task, listId) {
    const serializedTask = this.serialize(task);
    this.updateTask.emit({ task: serializedTask, listId });
  }

  serialize(task) {
    const serializedObject = {
      due: task.due,
      id: task.id,
      position: task.position,
      status: task.status ? 'completed' : 'needsAction',
      title: task.title
    };

    return serializedObject;
  }
}
