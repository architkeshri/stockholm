const mongoose= require('mongoose');

// User Table
const eventSchema= new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    creator:{
        type: String,
        required: true
    },
    attendee:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Event = mongoose.model("events", eventSchema);
module.exports = Event;