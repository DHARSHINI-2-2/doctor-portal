import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppointments, resetAppointmentState } from '../redux/slices/appointmentSlice';
import { Link } from 'react-router-dom';

function DoctorDashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { appointments, isLoading, isError, message } = useSelector((state) => state.appointments);

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        // Fetch appointments using the logged-in doctor's ID
        if (user && user.id) {
            dispatch(fetchUserAppointments(user.id));
        }

        return () => {
            dispatch(resetAppointmentState());
        };
    }, [user, isError, message, dispatch]);

    if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Appointments...</h2>;

    // Separate the appointments into two arrays based on their status
    const activeAppointments = appointments.filter(apt => apt.status === 'pending' || apt.status === 'approved');
    const completedAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');

    // A helper function to render the UI for a single appointment card
    const renderAppointmentCard = (apt, isActive) => (
        <div key={apt._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' }}>
            <div>
                <h3 style={{ color: isActive ? '#007bff' : '#6c757d', marginBottom: '5px' }}>
                    Patient: {apt.patientId ? apt.patientId.name : 'Unknown Patient'}
                </h3>
                <p><strong>Date:</strong> {new Date(apt.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {apt.timeSlot}</p>
                <p><strong>Reason:</strong> {apt.reasonForVisit || 'Not specified'}</p>
                <p><strong>Status:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold', color: apt.status === 'pending' ? 'orange' : apt.status === 'completed' ? 'green' : apt.status === 'cancelled' ? 'red' : '#007bff' }}>{apt.status}</span></p>
            </div>
            
            {/* Only show action buttons if the appointment is active */}
            {isActive && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <Link to={`/chat/${apt._id}`}>
                        <button style={{ padding: '8px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Join Chat
                        </button>
                    </Link>
                    <Link to={`/prescribe/${apt._id}/${apt.patientId._id}`}>
                        <button style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Write Prescription
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <h2 style={{ marginBottom: '10px' }}>Doctor Dashboard</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Welcome back, {user?.name}. Here is your schedule.</p>

            {/* --- ACTIVE SECTION --- */}
            <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px', color: '#007bff' }}>
                Active Appointments
            </h3>
            {activeAppointments.length === 0 ? (
                <p style={{ marginBottom: '40px', color: '#666', fontStyle: 'italic' }}>No active appointments right now.</p>
            ) : (
                <div style={{ marginBottom: '40px' }}>
                    {activeAppointments.map(apt => renderAppointmentCard(apt, true))}
                </div>
            )}

            {/* --- COMPLETED SECTION --- */}
            <h3 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px', color: '#28a745' }}>
                Past / Completed
            </h3>
            {completedAppointments.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No completed appointments yet.</p>
            ) : (
                <div>
                    {completedAppointments.map(apt => renderAppointmentCard(apt, false))}
                </div>
            )}
        </div>
    );
}

export default DoctorDashboard;