import { Injectable } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';
import { GapiRef } from './gapi-ref.service';

/**
 * Responsible for managing the tasks
 */
@Injectable()
export class GoogleTasksService {

  constructor(private progressBarService: ProgressBarService,
    private gapiRef: GapiRef) {
  }

  /**
   * Get a list of tasks by task list id
   * @param id is the id of task list
   */
  getTasks(taskListId) {
    this.progressBarService.enqueueTask();
    const objectParam = { tasklist: taskListId };

    return this.gapiRef.gapi.client.tasks.tasks.list(objectParam)
      .then(response => {
        this.progressBarService.dequeueTask();

        return response.result.items;
      });
  }

  /**
   * Update a specific task
   * @param taskId is the task id
   * @param taskListId is the list task id
   * @param task is the task object
   */
  updateTask(taskId: string, taskListId: string, task: Object): Promise<any> {
    const objectParam = { task: taskId, tasklist: taskListId };

    return this.gapiRef.gapi.client.tasks.tasks.update(objectParam, task);
  }
}
