import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk to fetch doctors
export const fetchDoctors = createAsyncThunk('doctors/getAll', async (_, thunkAPI) => {
    try {
        const response = await api.get('/doctors');
        // The backend returns { count, success, data: [...] }
        return response.data.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const doctorSlice = createSlice({
    name: 'doctors',
    initialState: {
        doctors: [],
        isLoading: false,
        isError: false,
        message: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export default doctorSlice.reducer;