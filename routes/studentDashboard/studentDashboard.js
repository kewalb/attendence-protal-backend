const express = require("express");
const Teacher = require("../../models/teacher");
const Student = require("../../models/student");
const Attendence = require('../../models/attendence')


// express router.
const router = express.Router();

router.get('/attendence-detail/:email', (request, response) => {
    const email = request.params.email
    Student.findOne({email}).then(data => {
        Attendence.findOne({studentId: data._id}).then(attendenceData => {
            response.json(attendenceData)
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})


router.put("/update-student/:id", async (request, response) => {
    const { name, email, role, gender, roll, contact, department, description } = request.body;
    const id = request.params.id;
    console.log(id, request.params)
    const updatedData = {
      name,
      email,
      roll,
      role,
      description,
      department,
      gender,
      contact,
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

module.exports = router;