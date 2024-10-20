import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmails = createAsyncThunk(
    'emails/fetchEmails',
    async (page = 1) => {
      const response = await axios.get(`https://flipkart-email-mock.vercel.app/?page=${page}`);
      return response.data.list; // No need to handle errors explicitly here
    }
);

const emailSlice = createSlice({
    name: 'emails',
    initialState: {
        emails: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.status = "pending"
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.emails = action.payload;
            })
            .addCase(fetchEmails.rejected, (state) => {
                state.status = "rejected";
            })
    }
});

export default emailSlice.reducer;