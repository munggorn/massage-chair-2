require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const reservationRoutes = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', limiter);

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Custom middleware to log requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api/reservations', reservationRoutes);

// Additional API endpoints for specific functionalities
app.get('/api/available-slots', async (req, res) => {
    try {
        const { date, location } = req.query;
        const existingReservations = await Reservation.find({ 
            date: date,
            location: location 
        });

        // Get all possible time slots
        const timeSlots = generateTimeSlots();
        
        // Filter out reserved slots
        const availableSlots = timeSlots.filter(slot => {
            return !existingReservations.some(res => res.timeSlot === slot);
        });

        res.json(availableSlots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/user-reservations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentDate = new Date();
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const reservations = await Reservation.find({
            userId: userId,
            timestamp: { $gte: firstDayOfMonth }
        }).sort({ timestamp: -1 });

        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Generate time slots helper function
function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 20) {
            const startHour = hour.toString().padStart(2, '0');
            const startMinute = minute.toString().padStart(2, '0');
            const endMinute = ((minute + 20) % 60).toString().padStart(2, '0');
            const endHour = minute + 20 >= 60 ? 
                (hour + 1).toString().padStart(2, '0') : 
                startHour;

            slots.push(`${startHour}:${startMinute} - ${endHour}:${endMinute}`);
        }
    }
    return slots;
}

// Check chair availability
app.get('/api/check-availability', async (req, res) => {
    try {
        const { date, location, timeSlot } = req.query;
        const reservations = await Reservation.find({
            date: date,
            location: location,
            timeSlot: timeSlot
        });

        const chairCounts = {
            'MCB1': 1, 'Satelite': 1, 'MCB2': 1,
            'MCB_TPX': 1, 'TPX_Admin': 1, 'MCB_TLB': 1,
            'TLB_Admin': 2, 'EBC': 3, 'LAB': 1,
            'CFP': 1, 'TSB': 3, 'ENCO': 3
        };

        const totalChairs = chairCounts[location] || 0;
        const reservedChairs = reservations.map(r => r.chair);
        const availableChairs = [];

        for (let i = 1; i <= totalChairs; i++) {
            if (!reservedChairs.includes(`Chair ${i}`)) {
                availableChairs.push(`Chair ${i}`);
            }
        }

        res.json({
            total: totalChairs,
            available: availableChairs,
            reserved: reservedChairs
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Validation middleware for reservations
const validateReservation = (req, res, next) => {
    const { date, location, timeSlot, chair, userId, userName } = req.body;
    
    if (!date || !location || !timeSlot || !chair || !userId || !userName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate date (only today or tomorrow allowed)
    const reservationDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (reservationDate < today || reservationDate > tomorrow) {
        return res.status(400).json({ error: 'Invalid date. Only today or tomorrow is allowed' });
    }

    next();
};

app.use('/api/reservations', validateReservation);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal server error',
            status: err.status || 500
        }
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404
        }
    });
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Log to monitoring service if available
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;