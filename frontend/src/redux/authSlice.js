import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null, 
    isAdmin: localStorage.getItem('isAdmin') || false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem('token', action.payload.token);
      
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;