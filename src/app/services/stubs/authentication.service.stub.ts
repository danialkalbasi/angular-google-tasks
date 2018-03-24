import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class AuthenticationServiceStub {
    isAuthenticate: any;

    constructor() {
        this.isAuthenticate = new BehaviorSubject(false);
    }

    signIn() { }

    signOut() { }

    subscribe() { }
}
