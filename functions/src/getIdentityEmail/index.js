const functions = require('firebase-functions');
const config = require('./../../config.json');
const getFriendlyNameFunction = `https://${config.functionRegion}-${config.projectName}.cloudfunctions.net/getFriendlyName`;
const axios = require('axios');

/**
* @export
* @param {Number} inputSeed (Optional) random seed to fix the result ot
* @returns an random email address that has not been assigned yet
*/
exports.main = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return true;
  }

  let friendlyName = await axios
    .get(getFriendlyNameFunction)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

    // TODO: try to get the friendlyName from the firestore redirectDB
    // if it exists, get another friendlyName, if it doesnt return it
    // repeat until unique name found

  res.send(`${friendlyName} - is cool`);
});
