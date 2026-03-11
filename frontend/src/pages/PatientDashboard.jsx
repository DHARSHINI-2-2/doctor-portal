import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PatientDashboard() {
    const { user } = useSelector((state) => state.auth);

    // Shared styling for the cards to keep the code clean
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '30px',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s',
        minHeight: '150px'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <h2>Welcome to your Dashboard, {user?.name}</h2>
            <p style={{ color: '#666', marginBottom: '40px' }}>What would you like to do today?</p>

            {/* CSS Grid for responsive cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                
                <Link to="/doctors" style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <h3 style={{ marginBottom: '10px', color: '#007bff' }}>🔍 Find a Doctor</h3>
                    <p style={{ fontSize: '14px', color: '#555' }}>Search specialists and book online appointments.</p>
                </Link>

                <Link to="/prescriptions" style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <h3 style={{ marginBottom: '10px', color: '#28a745' }}>💊 Prescriptions</h3>
                    <p style={{ fontSize: '14px', color: '#555' }}>View and manage your digital medical prescriptions.</p>
                </Link>

                <Link to="/history" style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <h3 style={{ marginBottom: '10px', color: '#17a2b8' }}>📋 Medical History</h3>
                    <p style={{ fontSize: '14px', color: '#555' }}>Track your past consultations and medical records.</p>
                </Link>

            </div>
        </div>
    );
}

export default PatientDashboard;