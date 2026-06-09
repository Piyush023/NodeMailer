import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import appHello from './appHello.js';
import data from './data.json' with { type: 'json' };

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log(JSON.stringify(data));

// Basic Home Endpoint
app.get('/', (_req, res) => {
  appHello();
  res.send('Hello World');
});

// Email Sending Endpoint
app.post('/send-email', (req, res) => {
  console.log(req.body);
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      res.status(500).send('Error sending email');
    }
    res.status(200).send('Email sent successfully');
  });
});

app.listen(3010, () => console.log('Server running on port 3010'));
