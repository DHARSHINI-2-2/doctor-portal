const express = require('express');
const { getAllDoctors } = require('../controllers/doctorController');

const router = express.Router();

// GET request to /api/doctors
router.get('/', getAllDoctors);

module.exports = router;