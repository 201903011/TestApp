import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    emailError: string | null;
    passwordError: string | null;
}

const initialState: AuthState = {
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.emailError = null;  // Reset error when updating email
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            state.passwordError = null;  // Reset error when updating password
        },
        setEmailError: (state, action: PayloadAction<string | null>) => {
            state.emailError = action.payload;
        },
        setPasswordError: (state, action: PayloadAction<string | null>) => {
            state.passwordError = action.payload;
        },
    },
});

export const { setEmail, setPassword, setEmailError, setPasswordError } = authSlice.actions;
export default authSlice.reducer;
