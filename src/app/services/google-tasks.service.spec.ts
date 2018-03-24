import { TestBed, inject } from '@angular/core/testing';
import { GoogleTasksService } from './google-tasks.service';
import {
  ProgressBarServiceStub,
  GapiRefStub
} from './stubs';
import { ProgressBarService } from './progress-bar.service';
import { GapiRef } from './gapi-ref.service';

describe('GoogleTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleTasksService,
        { provide: ProgressBarService, useClass: ProgressBarServiceStub },
        { provide: GapiRef, useClass: GapiRefStub },
      ]
    });
  });

  describe('constructor', () => {
    it('should create the service', inject([GoogleTasksService], (service: GoogleTasksService) => {
    }));
  });
});
