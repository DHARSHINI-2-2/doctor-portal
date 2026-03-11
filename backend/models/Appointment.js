const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Links to the User model
        required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Links to the User model
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    timeSlot: { 
        type: String, 
        required: true // e.g., "10:00 AM - 10:30 AM"
    },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    reasonForVisit: {
        type: String,
        required: false
    }
}, { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Appointment', appointmentSchema);