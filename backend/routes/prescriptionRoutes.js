const express = require('express');
const { createPrescription, getPatientPrescriptions } = require('../controllers/prescriptionCtrl');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply the 'protect' middleware to secure these routes
router.post('/', protect, createPrescription);
router.get('/patient/:patientId', protect, getPatientPrescriptions);

module.exports = router;