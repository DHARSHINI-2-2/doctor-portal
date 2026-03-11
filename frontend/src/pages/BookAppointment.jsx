import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment, resetAppointmentState } from '../redux/slices/appointmentSlice';

function BookAppointment() {
    const { id: doctorId } = useParams(); // Gets the doctor ID from the URL
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.appointments);

    const [formData, setFormData] = useState({
        date: '',
        timeSlot: '10:00 AM - 10:30 AM', // Default value
        reasonForVisit: ''
    });

    useEffect(() => {
        if (isError) alert(message);
        if (isSuccess) {
            alert(message);
            navigate('/patient-dashboard'); // Send them back to the dashboard after booking
        }
        dispatch(resetAppointmentState());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Combine the doctorId from the URL with the form data
        const appointmentData = {
            doctorId,
            date: formData.date,
            timeSlot: formData.timeSlot,
            reasonForVisit: formData.reasonForVisit
        };

        dispatch(bookAppointment(appointmentData));
    };

    // Hardcoded time slots for simplicity. 
    // In a massive production app, you would fetch available slots from the backend.
    const availableSlots = [
        "09:00 AM - 09:30 AM",
        "10:00 AM - 10:30 AM",
        "11:00 AM - 11:30 AM",
        "02:00 PM - 02:30 PM",
        "04:00 PM - 04:30 PM"
    ];

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Book Appointment</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label><strong>Select Date:</strong></label>
                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '95%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label><strong>Select Time Slot:</strong></label>
                    <select 
                        name="timeSlot" 
                        value={formData.timeSlot} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    >
                        {availableSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label><strong>Reason for Visit:</strong></label>
                    <textarea 
                        name="reasonForVisit" 
                        value={formData.reasonForVisit} 
                        onChange={handleChange} 
                        placeholder="E.g., Fever and mild headache..." 
                        rows="3"
                        style={{ width: '95%', padding: '10px', marginTop: '5px', resize: 'vertical' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                >
                    {isLoading ? 'Booking...' : 'Confirm Appointment'}
                </button>
            </form>
        </div>
    );
}

export default BookAppointment;