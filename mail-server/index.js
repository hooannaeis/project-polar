const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const mailParse = require('@sendgrid/inbound-mail-parser');

const { SENDGRID_USER, SENDGRID_PASS } = require('./sendgrid_creds');

const app = express();
app.use(cors);

const upload = multer();

const client = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: SENDGRID_USER,
    pass: SENDGRID_PASS,
  },
});

app.post('/', upload.none(), (req, res) => {
  try {
    const config = { keys: ['to', 'from', 'subject', 'text', 'html'] };
    const parsing = new mailParse(config, req);
    let mail = parsing.keyValues();
    mail.to = 'hanneskuhl@live.de';
    console.log('This is the subject from the mail: ', mail.subject);
    client.sendMail(email, function (err, info) {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      } else {
        console.log('Message sent: ' + info.response);
        return res.status(200).json({ success: true, data: info });
      }
    });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ success: false, data: err });
  }
});

app.get('/', (req, res) => {
  res.send('moin moin');
});

app.listen(8080);
console.log('app listening on port 8080');
