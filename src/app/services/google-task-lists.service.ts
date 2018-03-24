import { Injectable } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';
import { GapiRef } from './gapi-ref.service';

@Injectable()
export class GoogleTaskListsService {

  constructor(private progressBarService: ProgressBarService,
    private gapiRef: GapiRef) {
  }

  /**
   * @returns the task lists as promise
   */
  getTaskLists(count: number = 100): Promise<any> {
    this.progressBarService.enqueueTask();

    return this.gapiRef.gapi.client.tasks.tasklists.list({
      'maxResults': count
    }).then(response => {
      this.progressBarService.dequeueTask();
      return response.result.items;
    });
  }

}
