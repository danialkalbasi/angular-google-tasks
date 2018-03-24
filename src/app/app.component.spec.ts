import { TestBed, async, inject, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleTasksService, ProgressBarService, AuthenticationService, GapiService, GoogleTaskListsService } from './services';
import { GoogleTasksServiceStub, ProgressBarServiceStub, AuthenticationServiceStub, GoogleTaskListsServiceStub } from './services/stubs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: GoogleTasksService, useClass: GoogleTasksServiceStub },
        { provide: ProgressBarService, useClass: ProgressBarServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: GapiService, useClass: GoogleTasksServiceStub },
        { provide: GoogleTaskListsService, useClass: GoogleTaskListsServiceStub },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('Initialization', () => {
    it('should subscribe to the authentication updates', () => {
      // Arrange
      const spyOnAuth = spyOn(component, 'subscribeToAuthentication').and.callThrough();

      // Act
      fixture.detectChanges();

      // Assert
      expect(spyOnAuth).toHaveBeenCalledTimes(1);
    });

    it('should subscribe to the progress bar updates', () => {
      // Arrange
      const spyOnProgressBar = spyOn(component, 'subscribeToProgressBar').and.callThrough();

      // Act
      fixture.detectChanges();

      // Assert
      expect(spyOnProgressBar).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribeToAuthentication', () => {
    it('should call the subscribe', fakeAsync(inject([AuthenticationService],
      (authenticationService: AuthenticationService) => {
        // Arrange
        const spyOnSubscribe = spyOn(authenticationService.isAuthenticate, 'subscribe');

        // Act
        fixture.detectChanges();

        // Assert
        expect(spyOnSubscribe).toHaveBeenCalledTimes(1);
      })));

    it('should call the updateUserState', inject([AuthenticationService],
      (authenticationService: AuthenticationService) => {
        // Arrange
        const spyOnUpdateUserState = spyOn(component, 'updateUserState').and.callThrough();

        // Act
        fixture.detectChanges();

        // Assert
        expect(spyOnUpdateUserState).toHaveBeenCalled();
      }));
  });

  describe('updateUserState', () => {
    it('should change sign in status to true if the param is true', () => {
      // Arrange
      const spyOnTaskLists = spyOn(component, 'getTaskLists');

      // Act
      component.updateUserState(true);

      // Assert
      expect(component.isSignIn).toBeTruthy();
    });

    it('should call the getTaskLists if user signed in successfully', () => {
      // Arrange
      const spyOnTaskLists = spyOn(component, 'getTaskLists');

      // Act
      component.updateUserState(true);

      // Assert
      expect(spyOnTaskLists).toHaveBeenCalled();
    });

    it('should not call the getTaskLists if user sign in failed', () => {
      // Arrange
      const spyOnTaskLists = spyOn(component, 'getTaskLists');

      // Act
      component.updateUserState(false);

      // Assert
      expect(spyOnTaskLists).not.toHaveBeenCalled();
    });
  });
});
