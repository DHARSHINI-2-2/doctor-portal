const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public (or Private depending on your preference)
exports.getAllDoctors = async (req, res) => {
    try {
        // Find all users where the role is 'doctor'
        // .select('-password') ensures we don't send the hashed passwords to the frontend
        const doctors = await User.find({ role: 'doctor' }).select('-password');
        
        res.status(200).json({
            count: doctors.length,
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};