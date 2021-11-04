import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
