const express = require("express");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const { google } = require("googleapis");

// environment variable config.
require("dotenv").config({ path: "./.env" });
// express router.
const router = express.Router();
// required environment variables for endpoints of authentication.
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL;
const USERNAME = process.env.GMAILUSERNAME;
const PASSWORD = process.env.PASSWORD;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// connection to gmail using nodemailer
const OAuth2 = google.auth.OAuth2;
// setup for email functionality 
const oauth2Client = new OAuth2(
  CLIENT_ID, // ClientID
  CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();
// creating nodemailer transportation for email communication.
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: USERNAME,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
    tls: {
      rejectUnauthorized: false,
    },
  },
});

// endpoint for sign up functionality
router.post("/signup", async (request, response) => {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.json({ message: "Please fill in all the fields" });
    }
    User.findOne({ email: email }).then((dbUser) => {
      if (dbUser) {
        return response.json({ message: "Try with different email" });
      }
      bcrypt.hash(password, 10).then(async (hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          active: false,
          resetString: null,
          activationToken: null,
          resetToken: null,
          expireToken: null,
        });
        user
          .save()
          .then((user) => {
            // need to add activation logic
            crypto.randomBytes(32, (error, buffer) => {
              if (error) {
                console.log(error);
              }
              const token = buffer.toString("hex");
              user.activationToken = token;
              user.save().then(() => {
                let mailDetails = {
                  to: user.email,
                  from: "no-replay@insta.com",
                  subject: "Activate your account.",
                  html: `
                          <p>Click on the below link to activate your account.</p>
                          <h5>click in this <a href="http://localhost:9000/user/activate/${token}">link</a> to activate account.</h5>
                          `,
                };
                mailTransporter.sendMail(mailDetails, function (error, data) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent successfully");
                  }
                });
              });
              response.json({ message: "User created" });
            });
          })
          .catch((error) => console.log(error));
      });
    });
  });

