const express = require("express");
const Teacher = require("../../models/teacher");
const Student = require("../../models/student");
const Attendence = require("../../models/attendence");


// express router.
const router = express.Router();

router.get("/count/:dept", async (request, response) => {
    let dept = request.params.dept
  await Student.count({department:dept})
    .then((data) => response.json({data}))
    .catch((error) => console.log(error));
    // console.log(countStudent)
//   response.json({ "data": "hi" });
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
  const { name, email, role, gender, qualification, department, description } = request.body;
  const id = request.params.id;
  console.log(id, request.params)
  const updatedData = {
    name,
    email,
    role,
    description,
    department,
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

router.get("/student-detail-batch/:department", (request, response) => {
    const department = request.params.department;
    Student.find({department}).then((data) => {
        response.json({data})
    }).catch(error => {
        console.log(error)
    })
})

router.post("/mark-attendence/:id", async (request, response) => {
    const id = request.params.id;
    const {leave, present} = request.body;
    const date = Date.now()
    console.log(date)
    if (present && !leave){
      const date = new Date()
        Attendence.findOneAndUpdate({studentId: id}, {
            $inc: {
                daysAttended: 1
            },
            $push: { 
                attendenceByDate: {
                  "date" : date,
                  "status" : "P"
                  }  
              } 
        }).then(() => response.json({message: "updated successfully"}))
    }
    else if(leave && !present){
      const date = new Date()
        Attendence.findOneAndUpdate({studentId: id}, {
            $inc: {
                leave: 1
            },
            $push: { 
                attendenceByDate: {
                  "date" : date,
                  "status" : "L"
                  }  
              } 
        }).then(() => response.json({message: "updated successfully"}))
    }
    else{
      const date = new Date()
        Attendence.findOneAndUpdate({studentId: id}, {
            $push: { 
                attendenceByDate: {
                  "date" : date,
                  "status" : "A"
                  }  
              } 
        }).then(() => response.json({message: "updated successfully"}))
    }
})


module.exports = router;
