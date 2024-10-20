import { createSlice } from "@reduxjs/toolkit";

const emailDetailSlice = createSlice({
    name: 'emailDetail',
    initialState: {
        emailId: null,
        emailFilter: 'all',
    },
    reducers: {
        setEmailId: (state, action) => {
            state.emailId = action.payload;
        },
        resetEmailId: (state) => {
            state.emailId = null;
        },
        setEmailFilter: (state, action) => {
            state.emailFilter = action.payload;
        },
    },
});

export const { setEmailId, resetEmailId, setEmailFilter } = emailDetailSlice.actions;
export default emailDetailSlice.reducer;
