import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk to book an appointment
export const bookAppointment = createAsyncThunk('appointments/book', async (appointmentData, thunkAPI) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const fetchUserAppointments = createAsyncThunk('appointments/getAll', async (userId, thunkAPI) => {
    try {
        const response = await api.get(`/appointments/${userId}`);
        return response.data.data; // Our backend sends { success, count, data: [...] }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    reducers: {
        resetAppointmentState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookAppointment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bookAppointment.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Appointment booked successfully!';
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //doctor fetching appointments
            .addCase(fetchUserAppointments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointments = action.payload; // Save the fetched appointments to state
            })
            .addCase(fetchUserAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;