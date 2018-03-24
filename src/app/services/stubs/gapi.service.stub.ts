export class GapiServiceStub {
    instance;

    constructor() {
        this.instance = {
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
                        }
                    };
                }
            },
        };
    }
}
