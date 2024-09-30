import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: "student",
  reducers: {
    toggleForm: (state, action) => {
      return action.payload;
    },
  },
});

export const { toggleForm } = formSlice.actions;

export default formSlice.reducer;
