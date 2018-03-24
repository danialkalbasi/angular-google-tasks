import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProgressBarService {
  isInProgress: BehaviorSubject<boolean>;
  taskCount: number;

  constructor() {
    this.taskCount = 0;
    this.isInProgress = new BehaviorSubject(false);
  }

  enqueueTask() {
    this.taskCount++;
    this.isInProgress.next(true);
  }

  dequeueTask() {
    if (this.taskCount > 0) {
      this.taskCount--;
    }
    if (this.taskCount === 0) {
      this.isInProgress.next(false);
    }
  }
}
