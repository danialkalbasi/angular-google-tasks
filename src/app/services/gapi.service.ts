// @ts-ignore
import { Injectable, NgZone } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';
import { AuthenticationService } from './authentication.service';
import { GOOGLE_API } from '../constants';
import { GapiRef } from './gapi-ref.service';

/**
 * Responsible for initlizing the google task api
 */
@Injectable()
export class GapiService {
  /**
   * Run the oath on service load
   */
  constructor(private zone: NgZone,
    private progressBarService: ProgressBarService,
    private authenticationService: AuthenticationService,
    private gapiRef: GapiRef) {
    this.loadOAuth().then(() => this.initializeClient()).catch(this.handleError);
  }

  /**
   * @returns Promise
   * Load the oauth library and initialize the client api
   */
  loadOAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.zone.run(() => {
        this.gapiRef.gapi.load(GOOGLE_API.NAME, {
          callback: resolve,
          onerror: reject,
          timeout: 3000,
          ontimeout: reject
        });
      });
    });
  }

  /**
   * @returns void
   * Initialize the client api
   * Subscribe to the first time authentication
   * Push the new authentication state to subscribers of authenticationService.isAuthenticate
   */
  initializeClient(): void {
    this.progressBarService.enqueueTask();

    this.gapiRef.gapi.client
      .init(this.setupClientInitData())
      .then(() => {
        this.progressBarService.dequeueTask();
        return this.updateAuthState();
      });
  }

  /**
   * @returns an object containing of google api credentials
   * The credentials also accessible through Google Console
   */
  setupClientInitData(): Object {
    return {
      apiKey: GOOGLE_API.API_KEY,
      clientId: GOOGLE_API.CLIENT_ID,
      discoveryDocs: GOOGLE_API.DISCOVERY_DOCS,
      scope: GOOGLE_API.SCOPES
    };
  }

  /**
   * @returns void
   * Upon authentication updates, the authenticationService.isAuthenticate observable will push
   * the new new change to the subscribers
   */
  updateAuthState(): void {
    this.gapiRef.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignInResult) => {
      isSignInResult ? this.authenticationService.signIn() : this.authenticationService.signOut();
    });

    const isSignIn = this.gapiRef.gapi.auth2.getAuthInstance().isSignedIn.get();
    isSignIn ? this.authenticationService.signIn() : this.authenticationService.signOut();
  }

  /**
   * @returns void
   * Pop up the google authentication popup
   */
  signIn(): void {
    this.gapiRef.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   * @returns void
   * Sign the user out
   * Send the update to the subscribers
   */
  signOut(): void {
    this.gapiRef.gapi.auth2.getAuthInstance().signOut();
    this.authenticationService.signOut();
  }

  /**
   * Handle errors
   * @TODO create new class for exception handling
   * @param error is the exception object
   */
  handleError(error) {
    throw new Error(`Something is wrong: ${error}`);
  }

}
