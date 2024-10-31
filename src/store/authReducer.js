import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken"),
  userType: localStorage.getItem("userType"),
  user: JSON.parse(localStorage.getItem("user")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.user = JSON.parse(action.payload.user);
    },
    tempLogout: (state) => {
      state.isAuthenticated = false;
    },
    clearUserData: (state) => {
      state.token = null;
      state.userType = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("user");
    },
  },
});

export const { login, tempLogout, clearUserData } = authSlice.actions;
export default authSlice.reducer;
