export class ProgressBarServiceStub {
    isInProgress;

    constructor() {
        this.isInProgress = {
            next: () => { },
            subscribe: () => { }
        };
    }

    enqueueTask() { }

    dequeueTask() { }
}
