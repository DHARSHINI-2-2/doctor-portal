import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import FindDoctors from './pages/FindDoctor';
import ProtectedRoute from './components/ProtectedRoute';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import DoctorDashboard from './pages/DoctorDashboard'; 
import MedicalHistory from './pages/MedicalHistory';
import WritePrescription from './pages/WritePrescription';
import Prescriptions from './pages/Prescriptions';
import ConsultationRoom from './pages/ConsultationRoom';

function App() {
  return (
    <div>
      {/* The Navbar sits outside the Routes so it always displays */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            
            <Route path="/doctors" element={<FindDoctors />} />
            <Route path="/book/:id" element={<BookAppointment />} />
            <Route path="/prescribe/:appointmentId/:patientId" element={<WritePrescription />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/history" element={<MedicalHistory />} />
            <Route path="/chat/:appointmentId" element={<ConsultationRoom />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;