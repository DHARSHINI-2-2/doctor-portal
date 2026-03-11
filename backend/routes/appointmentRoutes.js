const express = require('express');
const { bookAppointment, getUserAppointments } = require('../controllers/appointmentCtrl');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply the 'protect' middleware to secure these routes
router.post('/', protect, bookAppointment);
router.get('/:userId', protect, getUserAppointments);

module.exports = router;