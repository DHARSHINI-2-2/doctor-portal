import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPrescription, resetPrescriptionState } from '../redux/slices/prescriptionSlice';
import { FaPlus, FaTrash, FaPrescriptionBottleAlt, FaSave, FaArrowLeft, FaNotesMedical } from 'react-icons/fa';

function WritePrescription() {
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

    const handleMedicineChange = (index, event) => {
        const values = [...medicines];
        values[index][event.target.name] = event.target.value;
        setMedicines(values);
    };

    const addMedicineRow = () => {
        setMedicines([...medicines, { medicineName: '', dosage: '', frequency: '', duration: '' }]);
    };

    const removeMedicineRow = (index) => {
        const values = [...medicines];
        values.splice(index, 1);
        setMedicines(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { appointmentId, patientId, medicines, doctorNotes };
        dispatch(createPrescription(data));
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <button 
                        type="button"
                        onClick={() => navigate('/doctor-dashboard')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg shadow-md">
                            <FaPrescriptionBottleAlt className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            Write Prescription
                        </h1>
                    </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-10 space-y-8">
                    
                    {/* Medicines Section */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <FaPrescriptionBottleAlt className="text-blue-500" /> Prescribed Medicines
                            </h2>
                            <button 
                                type="button" 
                                onClick={addMedicineRow}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors shadow-sm"
                            >
                                <FaPlus /> Add Medicine
                            </button>
                        </div>

                        <div className="space-y-4">
                            {medicines.map((med, index) => (
                                <div 
                                    key={index} 
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-center p-5 bg-white/60 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative group"
                                >
                                    {/* Medicine Name */}
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Medicine Name</label>
                                        <input 
                                            type="text" 
                                            name="medicineName" 
                                            placeholder="e.g., Paracetamol 500mg" 
                                            value={med.medicineName} 
                                            onChange={e => handleMedicineChange(index, e)} 
                                            required 
                                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                                        />
                                    </div>

                                    {/* Dosage */}
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Dosage</label>
                                        <input 
                                            type="text" 
                                            name="dosage" 
                                            placeholder="e.g., 500mg" 
                                            value={med.dosage} 
                                            onChange={e => handleMedicineChange(index, e)} 
                                            required 
                                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                                        />
                                    </div>

                                    {/* Frequency */}
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Frequency</label>
                                        <input 
                                            type="text" 
                                            name="frequency" 
                                            placeholder="e.g., 1-0-1" 
                                            value={med.frequency} 
                                            onChange={e => handleMedicineChange(index, e)} 
                                            required 
                                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Duration</label>
                                        <input 
                                            type="text" 
                                            name="duration" 
                                            placeholder="e.g., 5 days" 
                                            value={med.duration} 
                                            onChange={e => handleMedicineChange(index, e)} 
                                            required 
                                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                                        />
                                    </div>

                                    {/* Remove Button */}
                                    <div className="md:col-span-1 flex justify-end md:justify-center mt-2 md:mt-0 pt-4 md:pt-5">
                                        {medicines.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeMedicineRow(index)} 
                                                className="p-2.5 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm"
                                                title="Remove Medicine"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Doctor's Notes Section */}
                    <div className="pt-4 border-t border-gray-200">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                            <FaNotesMedical className="text-blue-500" /> Doctor's Notes (Optional)
                        </label>
                        <textarea 
                            value={doctorNotes} 
                            onChange={(e) => setDoctorNotes(e.target.value)} 
                            rows="4" 
                            placeholder="E.g., Drink plenty of water, avoid spicy food..." 
                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white/50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm resize-none shadow-sm"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <FaSave />
                            {isLoading ? 'Saving...' : 'Submit Prescription'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default WritePrescription;