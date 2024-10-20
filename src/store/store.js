import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formReducer.js";
import courseReducer from "./courseReducer.js"

export const store = configureStore({
    reducer: {
        form: formReducer,
        course: courseReducer,
    }
})