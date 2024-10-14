const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let link = process.env.frontendURL || "localhost:5173"
link = link + "/register"

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "JosueCota@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  
  async function emailConf(userEmail, user_id) {

      jwt.sign()
      const html = `
        <h1>Hello, Welcome to UniRoomies!</h1>
        <p>Please click the link to successfully register your account!<p>
        <a href="${link}">RegistrationLink</a>
      `;
      try {
        const transporter = nodemailer.createTransport({
            host: "",
            port: 465,
            secure: true,
            auth: {
                user: "",
                pass: "" 
            }
        });
            const info = await transporter.sendMail({
                from: "OpenJavaScript <user>",
                to: userEmail,
                subject: "Authenticate",
                html: html 
            })
            console.log(info.messageId);
    } catch (error) {
        console.log(error)
    }

}

