import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';
import prescriptionReducer from './slices/prescriptionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer, 
        doctors: doctorReducer,
        appointments: appointmentReducer,
        prescriptions: prescriptionReducer
    }
});