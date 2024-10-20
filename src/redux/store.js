import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./slices/emailSlice";
import selectionReducer from "./slices/selectionSlice";
import emailStatusReducer from "./slices/emailStatusLocalSlice";

export const store = configureStore({
    reducer: {
        emailReducer,
        selectionReducer,
        emailStatusReducer
    }
});