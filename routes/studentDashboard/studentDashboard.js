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