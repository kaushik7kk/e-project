import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (university) => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/course/get-courses?university=${university}`
    );
    return res.data.courses;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        return [];
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getCourses.rejected, (state) => {
        return [];
      });
  },
});

export default courseSlice.reducer;
