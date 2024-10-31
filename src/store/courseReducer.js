import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (university) => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/course/get-courses?university=${university}`
    );
    if (res.data.success) {
      return res.data.courses;
    } else {
      return [];
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseList: [],
    selectedCourses: [],
  },
  reducers: {
    toggleSelected: (state, action) => {
      const currCourse = action.payload;
      let updatedCourses = [...state.selectedCourses];

      if (state.selectedCourses.includes(currCourse)) {
        const courseInd = state.selectedCourses.indexOf(currCourse);
        updatedCourses.splice(courseInd, 1); // Correctly remove the element
      } else {
        updatedCourses = updatedCourses.concat(currCourse); // Return a new array
      }

      return {
        ...state,
        selectedCourses: updatedCourses,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        return {
          courseList: [],
          selectedCourses: [],
        };
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courseList = action.payload;
      })
      .addCase(getCourses.rejected, (state) => {
        return {
          courseList: [],
          selectedCourses: [],
        };
      });
  },
});

export const { toggleSelected } = courseSlice.actions;

export default courseSlice.reducer;
