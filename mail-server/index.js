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
    pass: SENDGRID_PASS
  }
});

let email = {
  from: 'hannes@identity.land',
  to: 'hanneskuhl@live.de',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(err);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});

app.post('/', upload.none(), (req, res) => {
  try {
    const config = {keys: ['to', 'from', 'subject', 'text',]};
    const parsing = new mailParse(config, req);
    let mail = parsing.keyValues();
    console.log('This is the subject from the mail: ', mail.subject);    
  }
})
