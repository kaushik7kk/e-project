import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getCourses = createAsyncThunk("course/getCourses", async (university) => {
  const res = await axios.get(
    "http://localhost:8080/api/v1/course/get-courses",
    {
      university,
    }
  );
  const data = await res.json();
  return data;
});

const courseSlice = createSlice({
  name: "course",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourses.pending, state => {
        return [];
    })
    .addCase(getCourses.fulfilled, (state, action) => {
        return action.payload;
    })
    .addCase(getCourses.rejected, state => {
        return [];
    })
  }
});
