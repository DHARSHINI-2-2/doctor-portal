import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatBox from '../components/ChatBox';

function ConsultationRoom() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <h2>Please log in to access the consultation room.</h2>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                &larr; Back to Dashboard
            </button>
            
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Secure Consultation Room</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                You are currently in a private chat. Messages are end-to-end real-time but not permanently saved.
            </p>

            <ChatBox appointmentId={appointmentId} username={user.name} />
        </div>
    );
}

export default ConsultationRoom;