import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppointments, resetAppointmentState } from '../redux/slices/appointmentSlice';
import { Link } from 'react-router-dom';

function MedicalHistory() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { appointments, isLoading, isError, message } = useSelector((state) => state.appointments);

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        // Fetch appointments using the logged-in patient's ID
        if (user && user.id) {
            dispatch(fetchUserAppointments(user.id));
        }

        return () => {
            dispatch(resetAppointmentState());
        };
    }, [user, isError, message, dispatch]);

    if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Medical History...</h2>;

    // Separate the appointments into two arrays
    const upcomingAppointments = appointments.filter(apt => apt.status === 'pending' || apt.status === 'approved');
    const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');

    const renderAppointmentCard = (apt, isUpcoming) => (
        <div key={apt._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' }}>
            <div>
                <h3 style={{ color: isUpcoming ? '#007bff' : '#6c757d', marginBottom: '5px' }}>
                    Doctor: {apt.doctorId ? apt.doctorId.name : 'Unknown Doctor'}
                </h3>
                <p><strong>Date:</strong> {new Date(apt.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {apt.timeSlot}</p>
                <p><strong>Reason for Visit:</strong> {apt.reasonForVisit || 'Not specified'}</p>
                <p><strong>Status:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold', color: apt.status === 'pending' ? 'orange' : apt.status === 'completed' ? 'green' : apt.status === 'cancelled' ? 'red' : '#007bff' }}>{apt.status}</span></p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {isUpcoming ? (
                    <Link to={`/chat/${apt._id}`}>
                        <button style={{ padding: '8px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Join Chat
                        </button>
                    </Link>
                ) : (
                    apt.status === 'completed' && (
                        <Link to="/prescriptions">
                            <button style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                View Prescription
                            </button>
                        </Link>
                    )
                )}
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <h2 style={{ marginBottom: '10px' }}>Medical History & Appointments</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Track your upcoming visits and past consultations here.</p>

            {/* --- UPCOMING SECTION --- */}
            <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px', color: '#007bff' }}>
                Upcoming Appointments
            </h3>
            {upcomingAppointments.length === 0 ? (
                <p style={{ marginBottom: '40px', color: '#666', fontStyle: 'italic' }}>You have no upcoming appointments.</p>
            ) : (
                <div style={{ marginBottom: '40px' }}>
                    {upcomingAppointments.map(apt => renderAppointmentCard(apt, true))}
                </div>
            )}

            {/* --- PAST SECTION --- */}
            <h3 style={{ borderBottom: '2px solid #6c757d', paddingBottom: '10px', marginBottom: '20px', color: '#6c757d' }}>
                Past Consultations
            </h3>
            {pastAppointments.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No past consultations found.</p>
            ) : (
                <div>
                    {pastAppointments.map(apt => renderAppointmentCard(apt, false))}
                </div>
            )}
        </div>
    );
}

export default MedicalHistory;