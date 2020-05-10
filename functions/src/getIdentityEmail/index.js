const functions = require('firebase-functions');
const config = require('./../../config.json');
const getFriendlyNameFunction = `https://${config.functionRegion}-${config.projectName}.cloudfunctions.net/getFriendlyName`;
const axios = require('axios');

const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: config.projectName,
  timestampsInSnapshots: true,
});

/**
 * asks the getFriendlyName-cloud function
 * for a random email alias
 *
 * @returns random email address
 */
async function getFriendlyMail() {
  let friendlyMail = await axios
    .get(getFriendlyNameFunction)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  // TODO: the domain should one day also be random
  console.log(friendlyMail);
  return `${friendlyMail}@hannes.cool`;
}

/**
 * checks if a specific email address is
 * a key in the redirect-firestore DB
 *
 * @param {Boolean} mailExists true if mail exists/ false if it does not exist
 */
async function checkMailExistence(mail) {
  let mailExists = await firestore
    .collection(config.collectionName)
    .where('receiveMail', '==', mail)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.err(err);
      return false;
    });
  return mailExists;
}

/**
 * @export
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

  let friendlyMail = await getFriendlyMail();
  let mailExiss = await checkMailExistence(friendlyMail);

  // TODO: this should keep getting new mails
  // until a unique one was found
  if (mailExiss) {
    friendlyMail = await getFriendlyMail();
  }

  // TODO: try to get the friendlyMail from the firestore redirectDB
  // if it exists, get another friendlyMail, if it doesnt return it
  // repeat until unique name found

  res.send(`${friendlyMail}`);
});
