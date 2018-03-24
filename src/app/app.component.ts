import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  GoogleTasksService,
  GoogleTaskListsService,
  ProgressBarService,
  AuthenticationService,
  GapiService
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Keep the task lists as an array object
   */
  taskLists: Array<any>;

  /**
   * Keep tasks as an array object
   */
  tasks: Array<any>;

  /**
   * Keep a boolean value whether is any
   * http request is in progress
   */
  isInProgress = false;

  /**
   * Keep a boolean value whether the user is already sign in
   */
  isSignIn: boolean;

  /**
   * Keep the title of selected list
   * The value will be pass by task lists component
   */
  selectedList: any;

  constructor(private changeDetectionRef: ChangeDetectorRef,
    private googleTasksService: GoogleTasksService,
    private progressBarService: ProgressBarService,
    private authenticationService: AuthenticationService,
    private gapiService: GapiService,
    private googleTaskListsService: GoogleTaskListsService) { }

  /**
   * It subscribe to authetication change and progress bar changes
   */
  ngOnInit() {
    this.subscribeToAuthentication();
    this.subscribeToProgressBar();
  }

  /**
   * Subscribe to authentication state
   */
  subscribeToAuthentication(): void {
    const updateUserState = this.updateUserState.bind(this);
    this.authenticationService.isAuthenticate
      .subscribe(updateUserState);
  }

  /**
   * Update the user sign in sttaus and if the user is sign in,
   * it it will retrieve the tasks
   * @param isSignIn is the sign in status
   */
  updateUserState(isSignIn) {
    this.isSignIn = isSignIn;
    if (this.isSignIn) {
      this.getTaskLists();
    }
  }

  /**
   * Subscibe to progress state
   */
  subscribeToProgressBar(): void {
    this.progressBarService.isInProgress.subscribe(state => {
      this.isInProgress = state;
      this.changeDetectionRef.detectChanges();
    });
  }

  /**
   * Get task list and get the first list items if available
   * @param isSignIn is boolean value which returns w
   */
  getTaskLists(): Promise<any> {
    return this.googleTaskListsService.getTaskLists().then(lists => {
      if (lists.length) {
        this.taskLists = lists;
        const firstItem = this.taskLists[0];
        this.selectList(this.taskLists[0]);
      }
    });
  }

  /**
   * Get the items of specific task list
   * @param id is the task list id
   */
  getTasks(listId): Promise<any> {
    return this.googleTasksService
      .getTasks(listId)
      .then(this.removeEmptyTasks)
      .then(this.parseStatus)
      .then(tasksResult => {
        this.tasks = tasksResult;
      });
  }

  /**
   * remove empty tasks and return the rest
   * @param tasks is list of tasks
   */
  removeEmptyTasks(tasks) {
    return tasks.filter(item => item.title !== '');
  }

  /**
   * parse the tasks status value to boolean
   * @param tasks is the list of tasks
   */
  parseStatus(tasks): any {
    return tasks.map(task => {
      task.status = task.status === 'completed' ? true : false;
      return task;
    });
  }

  /**
   * An event that fires when user select a task list
   * @param list is the list that selected by the user
   */
  onSelectList(list) {
    this.selectList(list);
  }

  /**
   * Load the tasks and update the list title
   * The list title will pass to tasks component
   * @param list
   */
  selectList(list) {
    this.selectedList = list;
    this.getTasks(this.selectedList.id);
  }

  /**
   * Authenticate the user by google api
   */
  authenticate(): void {
    this.gapiService.signIn();
  }

  /**
   * It fires whenever a task get updated
   * @param updatedTask is the task object
   */
  onTaskUpdate(updatedTask) {
    const { task, listId } = updatedTask;
    return this.googleTasksService.updateTask(task.id, listId, task).then(() => {
      this.getTasks(listId).then(() => { });
    });
  }
}
