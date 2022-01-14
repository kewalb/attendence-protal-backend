const mongoose = require("mongoose");

// defining schema for Student user.
const studentSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  roll:{
      type: String,
      required: true
  },
  contact: {
      type: Number
  },
  resetToken: String,
  activationToken: String,
  active: Boolean,
  expireToken: Date,
});

module.exports = mongoose.model("Student", studentSchema);
