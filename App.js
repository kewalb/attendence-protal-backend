// imports.
const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connecctDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 9000;

// configure environment variables
env.config();
// connecting to database
connecctDB();
//middlewares.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/admin', require('./routes/auth/adminAuth'))
app.use('/student', require('./routes/auth/studentAuth'))
app.use('/teacher', require('./routes/auth/teacherAuth'))

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
