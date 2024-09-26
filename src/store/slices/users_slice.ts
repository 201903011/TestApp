// redux/usersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the User type
interface User {
    name: {
        first: string;
        last: string;
    };
}

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        const response = await fetch('https://randomuser.me/api/?results=100&inc=name');
        const data = await response.json();
        return data.results;
    }
);

// Define the initial state
interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

// Create the slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    },
});

export default usersSlice.reducer;
