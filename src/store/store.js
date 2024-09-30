import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formReducer.js";

export const store = configureStore({
    reducer: {
        form: formReducer,
    }
})