import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Doctor: Create a new prescription
export const createPrescription = createAsyncThunk('prescriptions/create', async (prescriptionData, thunkAPI) => {
    try {
        const response = await api.post('/prescriptions', prescriptionData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Patient: Fetch their prescriptions
export const fetchPatientPrescriptions = createAsyncThunk('prescriptions/fetchPatient', async (patientId, thunkAPI) => {
    try {
        const response = await api.get(`/prescriptions/patient/${patientId}`);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const prescriptionSlice = createSlice({
    name: 'prescriptions',
    initialState: {
        prescriptions: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    reducers: {
        resetPrescriptionState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Cases
            .addCase(createPrescription.pending, (state) => { state.isLoading = true; })
            .addCase(createPrescription.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Prescription saved successfully!';
            })
            .addCase(createPrescription.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Fetch Cases
            .addCase(fetchPatientPrescriptions.pending, (state) => { state.isLoading = true; })
            .addCase(fetchPatientPrescriptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.prescriptions = action.payload;
            })
            .addCase(fetchPatientPrescriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetPrescriptionState } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;