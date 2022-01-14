const mongoose = require("mongoose");

// defining schema for admin user
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true
  },
  resetToken: String,
  activationToken: String,
  active: Boolean,
  expireToken: Date,
});

module.exports = mongoose.model("Admin", adminSchema);