const config = require('./../../config.json');

const nodemailer = require('nodemailer');
var Busboy = require('busboy');
const simpleParser = require('mailparser').simpleParser;
const functions = require('firebase-functions');

const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: config.projectName,
  timestampsInSnapshots: true,
});

const client = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: config.sendgridUser,
    pass: config.sendgridPass,
  },
});

exports.main = functions.https.onRequest(async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return true;
  }

  const busboy = new Busboy({ headers: req.headers });
  let email = {};
  const mailKeys = [
    'to',
    'from',
    'subject',
    'html',
    'text',
    'charsets',
    'envelope',
    'email',
  ];
  busboy.on('error', (err) => {
    console.log('busboy err:', err);
  });
  busboy.on('field', (field, val) => {
    if (mailKeys.includes(field)) {
      email[field] = val;
    }
  });
  busboy.end(req.rawBody);

  if (email.email) {
    let mailBuffer = Buffer.from(email.email, 'utf-8');
    email = await simpleParser(mailBuffer);

    // simpleparse returns headers as a map
    // iteration method stolen from:
    // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    let headerObject = {};
    for (const entry of email.headers.entries()) {
      if (!mailKeys.includes(entry[0])) {
        headerObject[entry[0]] = entry[1];
      }
    }
    email.headers = headerObject;

    // simpleparser turns addressfields into
    // objects with a text, html and a value field
    const addressKeys = ['to', 'from', 'cc', 'bcc'];
    addressKeys.forEach((aKey) => {
      if (email[aKey] && email[aKey].text) {
        email[aKey] = email[aKey].text;
      }
    });
    console.log('-------------------------------------');
  }

  console.log(email.to);
  let allDestinations = await firestore
    .collection(config.collectionName)
    .where('receiveMail', '==', email.to)
    .where('redirectActive', '==', true)
    .get()
    .then((querySnapshot) => {
      let destinations = {};
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        destinations[email.to] = data;
      });
      return destinations;
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });

  if (!allDestinations[email.to]) {
    return res.status(404).json({
      success: false,
      data: `unavailable email: ${email.to} does not exist`,
    });
  }
  const destinationMail = allDestinations[email.to].destinationMail;
  console.log('destinationMail', destinationMail);

  email.from = email.to;
  email.to = destinationMail;

  try {
    client.sendMail(email, (err, info) => {
      if (err) {
        console.log('err sending: ', err);
        return res.status(500).json({ success: false, data: err });
      } else {
        console.log('Message sent: ' + info.response);
        return res.status(200).json({ success: true, data: info });
      }
    });
  } catch (err) {
    console.trace('somehting went wrong here', err);
    return res.status(500).json({ success: false, data: err });
  }
});
