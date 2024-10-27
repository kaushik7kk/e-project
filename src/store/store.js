import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formReducer.js";
import courseReducer from "./courseReducer.js"
import authReducer from "./authReducer.js"

export const store = configureStore({
    reducer: {
        form: formReducer,
        course: courseReducer,
        auth: authReducer
    }
})