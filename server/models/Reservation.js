const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    chair: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Add index for faster queries
reservationSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Reservation', reservationSchema);