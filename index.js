import express from 'express';
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: "New Message from Contact Form",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send("Error sending email");
        }
        res.status(200).send("Email sent successfully");
    });
});

app.listen(3010, () => console.log("Server running on port 3010"));
