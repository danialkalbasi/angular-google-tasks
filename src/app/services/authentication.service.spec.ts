import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  describe('Initialization', () => {
    it('should be initialized', inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    }));

    it('should isAuthenticate initialized', inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service.isAuthenticate instanceof BehaviorSubject).toBeTruthy();
      expect(service.isAuthenticate).toBeDefined();
    }));
  });

  describe('signIn', () => {
    it('should send true to the subscribers', inject([AuthenticationService], (service: AuthenticationService) => {
      // Act
      service.signIn();

      // Assert
      service.subscribe(isSignIn => {
        expect(isSignIn).toBeTruthy();
      });
    }));
  });

  describe('signOut', () => {
    it('should send false to the subscribers', inject([AuthenticationService], (service: AuthenticationService) => {
      // Act
      service.signOut();

      // Assert
      service.subscribe(isSignIn => {
        expect(isSignIn).toBeFalsy();
      });
    }));
  });

});
