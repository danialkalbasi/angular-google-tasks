import { TestBed, inject } from '@angular/core/testing';
import { ProgressBarService } from './progress-bar.service';

describe('ProgressBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressBarService]
    });
  });

  it('should initialize the service', inject([ProgressBarService], (service: ProgressBarService) => {
    expect(service).toBeTruthy();
  }));
});
