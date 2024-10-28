const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//When frontend setup, change this
const link = process.env.frontendURL || "http://localhost:8081/api/auth/register/";

//Using brevo email host provider 
const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp-relay.brevo.com",
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  tls: {
    ciphers: "SSLv3"
  }
});

// JWT has id encoded into it which is sent after creating the user.
// Then gets encrypted here and sent to the email 
async function sendConfirmationEmail( email, id, res) {
    try {
      jwt.sign(
        {
          id: id
        },
        process.env.EMAIL_SECRET,
        {
          expiresIn: "1h"
        },
        (err, emailToken) => {
          const url = link + `${emailToken}`;
          
          transporter.sendMail({
            from: "'Josue Cota' <xjaramis@gmail.com>",
            to: email,
            subject: "Confirm Email",
            html: `<h2>Hello, Welcome to UniRoomies!</h2>
            <p>Please click the link to successfully register your account: <p> <br>
            <a href="${url}">${url}</a>`
          })

          if (err) {
            throw new Error(err);
          }
        });

        res.status(200).json({message:"Email Sent, User Created"});

        } catch (error) {
          res.status(400);
          throw new Error("Email Not Sent: " + error)
    }
}

module.exports = sendConfirmationEmail