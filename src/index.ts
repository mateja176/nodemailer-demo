import dotenv from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { join } from 'path';

dotenv.config();

const user = process.env.APP_USER;
const pass = process.env.APP_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

const emails = fs
  .readFileSync(join(__dirname, 'emails.txt'), {
    encoding: 'utf-8',
  })
  .trim()
  .split('\n');

const message = fs.readFileSync(join(__dirname, 'message.html'), {
  encoding: 'utf-8',
});

emails.forEach((email) => {
  const mailOptions: MailOptions = {
    from: 'videostorytellerwebapp@gmail.com',
    to: email,
    subject: 'Tell a story, people will want to experience',
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
});
