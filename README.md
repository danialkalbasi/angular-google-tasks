# Angular Google Tasks
![Angular Google Tasks](https://github.com/danielkalbasi/angular-google-tasks/blob/master/src/assets/google%20task-demo.gif?raw=true)

Google Task APIs implementation with Angular 5+ and TypeScript.

## To Get Started
### 1. Install npm packages
Run `yarn install` or `yarn`

### 2. Store your google api keys
Create a google-api.json in your application root directory with following structure: 
````
{
    "GOOGLE_API": {
        "API_KEY": "",
        "CLIENT_ID": ""
    }
}
````

In order to use this application, you need to get your API Key and Client ID from the Google developer console. You can find out more in here: https://developers.google.com/google-apps/tasks/quickstart/js

### Run localhost
Run `ng serve`

## Run unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## generate code documentation
Run `yarn compodoc` to generate the code documentation for the project with compodoc.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.