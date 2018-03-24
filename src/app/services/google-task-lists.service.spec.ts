import { TestBed, inject } from '@angular/core/testing';

import { GoogleTaskListsService } from './google-task-lists.service';
import {
  ProgressBarServiceStub,
  GapiRefStub
} from './stubs';
import { ProgressBarService } from './progress-bar.service';
import { GapiRef } from './gapi-ref.service';

describe('GoogleTaskListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleTaskListsService,
        { provide: ProgressBarService, useClass: ProgressBarServiceStub },
        { provide: GapiRef, useClass: GapiRefStub },
      ]
    });
  });

  it('should be created', inject([GoogleTaskListsService], (service: GoogleTaskListsService) => {
    expect(service).toBeTruthy();
  }));
});
