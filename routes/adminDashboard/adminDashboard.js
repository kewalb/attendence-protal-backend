const express = require("express");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Teacher = require("../../models/teacher");
const Student = require("../../models/student");
const { google } = require("googleapis");
const mongoose = require("mongoose");

// express router.
const router = express.Router();

router.get("/count", async (request, response) => {
  let countTeacher = 0;
  let countStudent = 0;
  await Teacher.count()
    .then((data) => (countTeacher = data))
    .catch((error) => console.log(error));
  await Student.count()
    .then((data) => (countStudent = data))
    .catch((error) => console.log(error));
  response.json({ countStudent, countTeacher });
});

// endpoint to get teacher detail for update purpose
router.get("/teacher-detail/:email", async (request, response) => {
  const email = request.params.email;
  if (email) {
    await Teacher.findOne({ email })
      .then((data) => {
        if (data) {
          response.json({ data });
        } else {
          response.json({ message: "No Record Found" });
        }
      })
      .catch((error) => console.log(error));
  } else {
    await Teacher.find()
      .then((data) => {
        response.json( data );
      })
      .catch((error) => console.log(error));
  }
});

// endpoint to get student detail for update purpose
router.get("/student-detail/:email", async (request, response) => {
  const email = request.params.email;
  if (email) {
    await Student.findOne({ email })
      .then((data) => {
        if (data) {
          response.json({ data });
        } else {
          response.json({ message: "No Record Found" });
        }
      })
      .catch((error) => console.log(error));
  } else {
    await Student.find()
      .then((data) => {
        response.json( data );
      })
      .catch((error) => console.log(error));
  }
});

// endpoint to update teacher's detail except for password field
router.put("/update-teacher/:id", async (request, response) => {
  const { name, email, role, gender, qualification } = request.body;
  const id = request.params.id;
  console.log(id, request.params)
  const updatedData = {
    name,
    email,
    role,
    gender,
    qualification,
  };
  await Teacher.findByIdAndUpdate(id, updatedData, (error, updatedData) => {
    if(error){
      response.json({message: "Failed to update"})
    }
    else{
      console.log(updatedData)
      response.json({message: "Update successful"})
    }
  })
});

// endpoint to update student's detail except for password field
router.put("/update-student/:id", async (request, response) => {
  const { name, email, gender, department, roll } = request.body;
  const id = request.params.id;
  console.log(id, request.params)
  const updatedData = {
    name,
    email,
    role: 'student',
    department,
    roll,
    gender,
  };
  await Student.findByIdAndUpdate(id, updatedData, (error, updatedData) => {
    if(error){
      response.json({message: "Failed to update"})
    }
    else{
      console.log(updatedData)
      response.json({message: "Update successful"})
    }
  })
});


router.delete("/remove-teacher/:email", (request, response) => {
  const email = request.params.email
  Teacher.deleteOne({email}, (error, deletedRecord) => {
    if(error){
      response.json({message: "Failed to delete"})
    }
    else{
      response.json({message: "Deleted successfully"})
    }
  })
})

router.delete("/remove-student/:email", (request, response) => {
  const email = request.params.email
  Student.deleteOne({email}, (error, deletedRecord) => {
    if(error){
      response.json({message: "Failed to delete"})
    }
    else{
      response.json({message: "Deleted successfully"})
    }
  })
})

module.exports = router;
