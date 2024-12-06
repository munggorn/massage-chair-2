// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// API Routes
const reservationSchema = new mongoose.Schema({
    date: String,
    location: String,
    timeSlot: String,
    chair: String,
    userId: String,
    userName: String,
    timestamp: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Get all reservations
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a reservation
app.post('/api/reservations', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a reservation
app.delete('/api/reservations/:id', async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reservation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Check user reservations
app.get('/api/user-reservations/:userId', async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const reservations = await Reservation.find({
            userId: req.params.userId,
            timestamp: { $gte: firstDayOfMonth }
        });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Check chair availability
app.get('/api/check-availability', async (req, res) => {
    try {
        const { date, location, timeSlot } = req.query;
        const reservations = await Reservation.find({ date, location, timeSlot });
        res.json({ reserved: reservations.map(r => r.chair) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve index.html for all other routes (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
