// @ts-ignore
import { TestBed, inject, async } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { GapiService } from './gapi.service';
import { ProgressBarService } from './progress-bar.service';
import { AuthenticationService } from './authentication.service';
import { GapiRef } from './gapi-ref.service';
import { GapiRefStub } from './stubs/gapi-ref.service.stub';
import {
    ProgressBarServiceStub,
    AuthenticationServiceStub
} from './stubs';

describe('GapiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GapiService,
                { provide: ProgressBarService, useClass: ProgressBarServiceStub },
                { provide: AuthenticationService, useClass: AuthenticationServiceStub },
                { provide: GapiRef, useClass: GapiRefStub }
            ]
        });
    });

    describe('constructor', () => {
        it('should create the service', inject([GapiService], (service: GapiService) => {
            // Assert
            expect(service).toBeTruthy();
            expect(service).toBeDefined();
        }));
    });

    describe('loadOAuth()', () => {
        it('should call the load function of gapi', async(inject([GapiService, GapiRef], (service: GapiService, gapiRef: GapiRef) => {
            // Arrange
            const spyOnGapiClientInit = spyOn(gapiRef.gapi, 'load')
                .and.returnValue(Promise.resolve(true));

            // Act
            service.loadOAuth();

            // Assert
            expect(spyOnGapiClientInit).toHaveBeenCalledTimes(1);
        })));

        it('should return Promise', async(inject([GapiService], (service: GapiService) => {
            // Act
            const loadOAuth = service.loadOAuth();

            // Assert
            expect(loadOAuth instanceof Promise).toBeTruthy();
        })));

        it('should return Promise', async(inject([GapiService, NgZone], (service: GapiService, zone: NgZone) => {
            // Arrange
            const spy = spyOn(zone, 'run').and.callThrough();

            // Act
            service.loadOAuth();

            // Assert
            expect(spy).toHaveBeenCalled();
        })));
    });

    describe('initializeClient', () => {
        it('should call the client.init()', async(inject([GapiService, GapiRef], (service: GapiService, gapiRef: GapiRef) => {
            // Arrange
            const spyOnClientInit = spyOn(gapiRef.gapi.client, 'init')
                .and.returnValue(Promise.resolve(false));

            // Act
            service.initializeClient();

            // Assert
            expect(spyOnClientInit).toHaveBeenCalled();
        })));
    });

    describe('setupClientInitData', () => {
        it('should return valid client data as an object', inject([GapiService], (service: GapiService) => {
            // Act
            const initialData = service.setupClientInitData();
            const validProperties = ['apiKey', 'clientId', 'discoveryDocs', 'scope'];
            const originalProperties = Object.getOwnPropertyNames(initialData);

            // Assert
            expect(validProperties).toEqual(originalProperties);
            expect(initialData instanceof Object).toBeTruthy();
        }));
    });

    describe('updateAuthState', () => {
        it('should update subscribers with true or false', async(inject([GapiService, GapiService, AuthenticationService],
            (service: GapiService, gapi: GapiService, authService: AuthenticationService) => {
                // Act
                service.updateAuthState();

                // Assert
                authService.subscribe((isSignIn) => {
                    expect(isSignIn).not.toBeUndefined();
                    expect(isSignIn).not.toBeNull();
                });
            })));

        it('should call getAuthInstance at least one time',
            async(inject([GapiService, GapiRef], (service: GapiService, gapiRef: GapiRef) => {
                // Arrange
                const spyOnGetAuthInstance = spyOn(gapiRef.gapi.auth2, 'getAuthInstance')
                    .and.callThrough();

                // Act
                service.updateAuthState();

                // Assert
                expect(spyOnGetAuthInstance).toHaveBeenCalled();
            })));
    });

    describe('signIn', () => {
        it('should call signIn from Gapi', inject([GapiService, GapiRef], (service: GapiService, gapiRef: GapiRef) => {
            // Arrange
            spyOn(gapiRef.gapi.auth2, 'getAuthInstance').and.callFake(() => this)
                .and.returnValue({ signIn: () => { } });
            const spyOnSignIn = spyOn(gapiRef.gapi.auth2.getAuthInstance(), 'signIn');

            // Act
            service.signIn();
            const numberOfCalls = spyOnSignIn.calls.count();

            // Assert
            expect(numberOfCalls).toBe(1);
        }));
    });

    describe('signOut', () => {
        it('should call signOut from Gapi', inject([GapiService, GapiRef], (service: GapiService, gapiRef: GapiRef) => {
            // Arrange
            spyOn(gapiRef.gapi.auth2, 'getAuthInstance')
                .and.callFake(() => this)
                .and.returnValue({ signOut: () => { } });
            const spyOnSignIn = spyOn(gapiRef.gapi.auth2.getAuthInstance(), 'signOut');

            // Act
            service.signOut();
            const numberOfCalls = spyOnSignIn.calls.count();

            // Assert
            expect(numberOfCalls).toBe(1);
        }));
    });
});
