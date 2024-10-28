import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken'),
    userType: localStorage.getItem('userType'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userType = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
