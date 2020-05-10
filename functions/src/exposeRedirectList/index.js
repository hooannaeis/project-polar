const config = require('./../../config.json');
const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: config.projectName,
  timestampsInSnapshots: true,
});

async function getRedirectList() {
  const docRef = firestore.collection(config.collectionName);
  let redirectList = await docRef
    .where('redirectActive', '==', true)
    .get()
    .then((snapshot) => {
      let redirectL = snapshot.docs.map((doc) => {
        const redirectDoc = doc.data();
        return {
          receiveMail: redirectDoc.receiveMail,
          destinationMail: redirectDoc.destinationMail
        }
      });
      return redirectL;
    })
    .catch((err) => {
      console.error('got an error', err);
      return err
    });
  return redirectList;
}

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

  const redirectList = await getRedirectList();
  return res.json(redirectList);
});
