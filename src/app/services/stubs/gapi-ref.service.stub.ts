export class GapiRefStub {
    gapi;

    constructor() {
        this.gapi = {
            load: (string, callback) => { },
            client: {
                init: () => { }
            },
            auth2: {
                getAuthInstance: () => {
                    return {
                        isSignedIn: {
                            listen: (callback) => { callback(); },
                            get: () => { }
                        },
                        signIn: () => { },
                        signOut: () => { }
                    };
                }
            },
        };
    }
}
