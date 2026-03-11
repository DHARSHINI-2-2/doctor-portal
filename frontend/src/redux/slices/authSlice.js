import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Get user from localStorage if they previously logged in
const user = JSON.parse(localStorage.getItem('user'));

// Async Thunk for Login
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await api.post('/auth/login', userData);
        if (response.data) {
            // Combine the nested user info and the token into one flat object
            const loggedInUser = {
                ...response.data.user,
                token: response.data.token
            };
            
            // Save the flattened object to local storage
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            
            return loggedInUser; 
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Async Thunk for Register
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user ? user : null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Login Cases
            .addCase(loginUser.pending, (state) => { state.isLoading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            // Register Cases
            .addCase(registerUser.pending, (state) => { state.isLoading = true; })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;