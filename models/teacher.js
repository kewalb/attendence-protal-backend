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
    enum: ["B.ed", "M.ed", "Other teaching certification"],
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  resetToken: String,
  activationToken: String,
  active: Boolean,
  expireToken: Date,
});

module.exports = mongoose.model("Teacher", teacherSchema);