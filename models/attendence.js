const mongoose = require('mongoose');

// ObjectId = mongoose.Schema.
const attendenceSchema = mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: "Student"
    },
    totalDays:{
        type: Number,
    },
    daysAttended: {
        type: Number
    },
    leave:{
        type: Number
    },
    attendenceByDate:{
        type: Array,
    }

})