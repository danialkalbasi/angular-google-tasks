# Google Task APIs implementation with Angular 5+
![Angular Google Tasks](https://github.com/danielkalbasi/angular-google-tasks/blob/master/src/assets/google%20task-demo.gif?raw=true)
A simple implementation of Google Task APIs with Angular 5.x. If you are new to Angular, this project will help you to grasp some of the main concepts of the Angular/TypeScript and learn a few other useful techniques!
- Angular Module usage
- Create dumb ui components
- Usage of services
- Unit testing techniques

## Get Started
## 1. Install npm packages
Run `yarn` or `npm install`

## 2. Store your google api keys
Create a google-api.json in your application root directory with following structure: 
````
{
    "GOOGLE_API": {
        "API_KEY": "",
        "CLIENT_ID": ""
    }
}
````
In order to run the application, you need to get your API Key and Client ID from the Google Developer Console. You can find out more in here: https://developers.google.com/google-apps/tasks/quickstart/js

## Run on localhost
Run `ng serve` or `yarn serve`

## Run unit tests
Run `ng test` or `yarn test`

## generate code documentation
Run `yarn compodoc` to generate the code documentation for the project with compodoc.

## Build
Run `ng build` or `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.