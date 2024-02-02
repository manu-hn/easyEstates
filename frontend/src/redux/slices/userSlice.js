
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    currentUser: [],
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginInitiated: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
            state.isAuthenticated = true;

        },
        loginFailure: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;

        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
            state.isAuthenticated = true;
        },
        updateUserFailure: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        }
    }
});



export const {
    loginFailure,
    loginInitiated,
    loginSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess } = userSlice.actions;

export default userSlice.reducer;


