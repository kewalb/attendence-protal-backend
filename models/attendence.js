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
        default: 0
    },
    daysAttended: {
        type: Number,
        default: 0
    },
    leave:{
        type: Number,
        default: 0
    },
    attendenceByDate:{
        type: Array,
    }

});

module.exports = mongoose.model("Attendence", attendenceSchema);