const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');

// @desc    Create a new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctors only)
exports.createPrescription = async (req, res) => {
    try {
        // Security check: Only doctors can prescribe
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ success: false, message: 'Only doctors can write prescriptions' });
        }

        const { appointmentId, patientId, medicines, doctorNotes } = req.body;

        // Verify the appointment exists
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        const newPrescription = await Prescription.create({
            appointmentId,
            patientId,
            doctorId: req.user.id, // Derived securely from the logged-in doctor's token
            medicines,
            doctorNotes
        });

        // Optionally, update the appointment status to 'completed'
        appointment.status = 'completed';
        await appointment.save();

        res.status(201).json({
            success: true,
            message: 'Prescription created successfully',
            data: newPrescription
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get prescriptions for a specific patient
// @route   GET /api/prescriptions/patient/:patientId
// @access  Private
exports.getPatientPrescriptions = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Security check: Patients can only view their own prescriptions
        if (req.user.role === 'patient' && req.user.id !== patientId) {
            return res.status(403).json({ success: false, message: 'Not authorized to view these prescriptions' });
        }

        const prescriptions = await Prescription.find({ patientId })
            .populate('doctorId', 'name email')
            .populate('appointmentId', 'date timeSlot')
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json({
            success: true,
            count: prescriptions.length,
            data: prescriptions
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};