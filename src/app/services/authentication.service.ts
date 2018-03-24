import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Authenitcation service to let the subscribers know user is sign in or sign out
 * This service is not expose any authentication handler
 * TODO: Create an authentication interface, so any service that needs to implement
 * authentication, follow the same signatures
 */
@Injectable()
export class AuthenticationService {
  /**
    * An observable to keep the authentication state of the user
    * The subscribers will receive the updates whenever there is an authentication
  */
  isAuthenticate: BehaviorSubject<boolean>;

  constructor() {
    this.isAuthenticate = new BehaviorSubject(false);
  }

  /**
   * Tell the subscribers that user is signed in
   */
  signIn(): void {
    this.isAuthenticate.next(true);
  }

  /**
   * Tell the subscribers that user is signed out
   */
  signOut(): void {
    this.isAuthenticate.next(false);
  }

  subscribe(fn) {
    this.isAuthenticate.subscribe((isSignIn) => fn(isSignIn));
  }

}
