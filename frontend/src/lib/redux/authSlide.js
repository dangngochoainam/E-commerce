import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    loginFail: (state, action) => {
      state.currentUser = null;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginSuccess, loginFail, logoutSuccess } = authSlide.actions;

export default authSlide.reducer;
