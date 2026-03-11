import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientPrescriptions, resetPrescriptionState } from '../redux/slices/prescriptionSlice';

function Prescriptions() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { prescriptions, isLoading, isError, message } = useSelector((state) => state.prescriptions);

    useEffect(() => {
        if (isError) console.error(message);
        
        if (user && user.id) {
            dispatch(fetchPatientPrescriptions(user.id));
        }

        return () => { dispatch(resetPrescriptionState()); };
    }, [user, isError, message, dispatch]);

    if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Prescriptions...</h2>;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
            <h2 style={{ marginBottom: '20px' }}>My Prescriptions</h2>
            
            {prescriptions.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No prescriptions found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {prescriptions.map((script) => (
                        <div key={script._id} style={{ border: '2px solid #28a745', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
                            <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ color: '#28a745', margin: 0 }}>Dr. {script.doctorId?.name || 'Unknown'}</h3>
                                    <small style={{ color: '#666' }}>{script.doctorId?.email}</small>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <strong>Date:</strong> {new Date(script.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                                        <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Medicine</th>
                                        <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Dosage</th>
                                        <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Frequency</th>
                                        <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {script.medicines.map((med, idx) => (
                                        <tr key={idx}>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>{med.medicineName}</strong></td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{med.dosage}</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{med.frequency}</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{med.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {script.doctorNotes && (
                                <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', borderLeft: '4px solid #17a2b8' }}>
                                    <strong>Doctor's Notes:</strong> {script.doctorNotes}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Prescriptions;