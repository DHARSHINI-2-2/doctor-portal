const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicines: [{
        medicineName: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g., "500mg"
        frequency: { type: String, required: true }, // e.g., "1-0-1" or "Twice a day"
        duration: { type: String, required: true } // e.g., "5 days"
    }],
    doctorNotes: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);