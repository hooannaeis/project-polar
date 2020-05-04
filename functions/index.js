// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const getFriendlyName = require('./src/getFriendlyName');
exports.getFriendlyName = getFriendlyName.main;

const getIdentityEmail = require('./src/getIdentityEmail');
exports.getIdentityEmail = getIdentityEmail.main;

