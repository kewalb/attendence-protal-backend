const mongoose = require('mongoose');

// ObjectId = mongoose.Schema.
// Schema for attendence model
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

});

module.exports = mongoose.model("Attendence", attendenceSchema);