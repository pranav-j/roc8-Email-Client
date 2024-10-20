import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    emailStatus: JSON.parse(localStorage.getItem('emailStatus')) || [],
};

const emailStatusSlice = createSlice({
    name: 'emailStatus',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const emailId = action.payload;
            const emailIndex = state.emailStatus.findIndex((email) => email.id === emailId);
            
            if (emailIndex !== -1) {
                // Toggle the favorite status
                state.emailStatus[emailIndex].fav = !state.emailStatus[emailIndex].fav;
            } else {
                // If the email doesn't exist in the status, add it with fav set to true
                state.emailStatus.push({ id: emailId, fav: true });
            }

            localStorage.setItem('emailStatus', JSON.stringify(state.emailStatus));
        },
        addEmailToViewed: (state, action) => {
            const emailId = action.payload;
            const emailExists = state.emailStatus.some((email) => email.id === emailId);
            
            if (!emailExists) {
                state.emailStatus.push({ id: emailId, fav: false });
                localStorage.setItem('emailStatus', JSON.stringify(state.emailStatus));
            }
        },
    },
});

export const { toggleFavorite, addEmailToViewed } = emailStatusSlice.actions;
export default emailStatusSlice.reducer;
