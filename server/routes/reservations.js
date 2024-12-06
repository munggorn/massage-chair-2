const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new reservation
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        date: req.body.date,
        location: req.body.location,
        timeSlot: req.body.timeSlot,
        chair: req.body.chair,
        userId: req.body.userId,
        userName: req.body.userName
    });

    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (reservation) {
            await reservation.remove();
            res.json({ message: 'Reservation deleted' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;