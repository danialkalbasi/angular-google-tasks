/**
 * Create a google-api.json in your app root and include below details of your api keys
 * {
    "GOOGLE_API": {
        "API_KEY": "API_KEY",
        "CLIENT_ID": "CLIENT_ID"
    }
}*/
const googleApiPackage = require('../../google-api.json');

const GOOGLE_API = {
    NAME: 'client:auth2',
    CLIENT_ID: googleApiPackage.GOOGLE_API.CLIENT_ID,
    API_KEY: googleApiPackage.GOOGLE_API.API_KEY,
    DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'],
    SCOPES: 'https://www.googleapis.com/auth/tasks',
};

export {
    GOOGLE_API,
};
