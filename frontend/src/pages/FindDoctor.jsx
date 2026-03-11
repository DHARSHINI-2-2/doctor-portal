import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/slices/doctorSlice';
import { Link } from 'react-router-dom';

function FindDoctors() {
    const dispatch = useDispatch();
    const { doctors, isLoading, isError, message } = useSelector((state) => state.doctors);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);

    // Simple search filter based on doctor name
    const filteredDoctors = doctors.filter((doc) => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Doctors...</h2>;
    if (isError) return <h2 style={{ textAlign: 'center', color: 'red' }}>Error: {message}</h2>;

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Find a Doctor</h1>
            
            <input 
                type="text" 
                placeholder="Search by doctor name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '30px', fontSize: '16px' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <div key={doctor._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#007bff', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '24px', fontWeight: 'bold' }}>
                                {doctor.name.charAt(0)}
                            </div>
                            <h3>{doctor.name}</h3>
                            <p style={{ color: 'gray' }}>{doctor.email}</p>
                            
                            {/* We will build this booking route next */}
                            <Link to={`/book/${doctor._id}`}>
                                <button style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                    Book Appointment
                                </button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No doctors found.</p>
                )}
            </div>
        </div>
    );
}

export default FindDoctors;