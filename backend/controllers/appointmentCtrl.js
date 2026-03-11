const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Patients only)
exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot, reasonForVisit } = req.body;

        // Create the appointment using the logged-in user's ID as patientId
        const newAppointment = await Appointment.create({
            patientId: req.user.id, 
            doctorId,
            date,
            timeSlot,
            reasonForVisit
        });

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: newAppointment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get appointments for a specific user
// @route   GET /api/appointments/:userId
// @access  Private
exports.getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure the user requesting is either the owner of the data or an admin/doctor
        if (req.user.id !== userId && req.user.role === 'patient') {
            return res.status(403).json({ message: 'Not authorized to view these appointments' });
        }

        // Find appointments and populate the doctor and patient details (name and email only)
        const appointments = await Appointment.find({
            $or: [{ patientId: userId }, { doctorId: userId }]
        })
        .populate('doctorId', 'name email')
        .populate('patientId', 'name email');

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};