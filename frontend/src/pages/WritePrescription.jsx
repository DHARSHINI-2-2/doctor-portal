import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPrescription, resetPrescriptionState } from '../redux/slices/prescriptionSlice';

function WritePrescription() {
    // Grab the appointment and patient IDs from the URL
    const { appointmentId, patientId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.prescriptions);

    const [doctorNotes, setDoctorNotes] = useState('');
    const [medicines, setMedicines] = useState([
        { medicineName: '', dosage: '', frequency: '', duration: '' }
    ]);

    useEffect(() => {
        if (isError) alert(message);
        if (isSuccess) {
            alert(message);
            navigate('/doctor-dashboard');
        }
        dispatch(resetPrescriptionState());
    }, [isError, isSuccess, message, navigate, dispatch]);

    // Handle typing in the dynamic medicine fields
    const handleMedicineChange = (index, event) => {
        const values = [...medicines];
        values[index][event.target.name] = event.target.value;
        setMedicines(values);
    };

    // Add a new blank medicine row
    const addMedicineRow = () => {
        setMedicines([...medicines, { medicineName: '', dosage: '', frequency: '', duration: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            appointmentId,
            patientId,
            medicines,
            doctorNotes
        };
        dispatch(createPrescription(data));
    };

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Write Prescription</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Dynamic Medicine Fields */}
                <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Medicines</h3>
                    {medicines.map((med, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                            <input type="text" name="medicineName" placeholder="Medicine Name" value={med.medicineName} onChange={e => handleMedicineChange(index, e)} required style={{ flex: '1', padding: '8px' }} />
                            <input type="text" name="dosage" placeholder="Dosage (e.g., 500mg)" value={med.dosage} onChange={e => handleMedicineChange(index, e)} required style={{ width: '120px', padding: '8px' }} />
                            <input type="text" name="frequency" placeholder="Freq (e.g., 1-0-1)" value={med.frequency} onChange={e => handleMedicineChange(index, e)} required style={{ width: '120px', padding: '8px' }} />
                            <input type="text" name="duration" placeholder="Days (e.g., 5 days)" value={med.duration} onChange={e => handleMedicineChange(index, e)} required style={{ width: '120px', padding: '8px' }} />
                        </div>
                    ))}
                    <button type="button" onClick={addMedicineRow} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                        + Add Another Medicine
                    </button>
                </div>

                <div>
                    <label><strong>Doctor's Notes (Optional):</strong></label>
                    <textarea value={doctorNotes} onChange={(e) => setDoctorNotes(e.target.value)} rows="4" style={{ width: '100%', padding: '10px', marginTop: '5px', resize: 'vertical' }} placeholder="E.g., Drink plenty of water..." />
                </div>

                <button type="submit" disabled={isLoading} style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                    {isLoading ? 'Saving...' : 'Submit Prescription'}
                </button>
            </form>
        </div>
    );
}

export default WritePrescription;