const mongoose = require("mongoose");

// defining schema for a teacher user.
const teacherSchema = new mongoose.Schema({
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
  qualification:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  department:{
    type: String,
    required: true
  },
  description:{
    type: String
  },
  resetToken: String,
  activationToken: String,
  active: Boolean,
  expireToken: Date,
});

module.exports = mongoose.model("Teacher", teacherSchema);