// imports.
const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')
// const connecctDB = require("./config/db");

const app = express();

// configure environment variables
env.config();
// connecting to database
connecctDB();

const PORT = process.env.PORT || 9000;