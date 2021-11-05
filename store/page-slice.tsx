import { createSlice } from "@reduxjs/toolkit";
const pageSlice = createSlice({
  name: "page",
  initialState: {
    pagePath: "/dashboard",
    onloan: false,
    userdata: {
      user: "",
      loanamount: 0,
      duration: 0,
      paidloan: 0,
    },
  },
  reducers: {
    setPagePath(state, action) {
      state.pagePath = action.payload;
    },
    setOnLoan(state, action) {
      state.onloan = action.payload;
    },
    setUserData(state, action) {
      state.userdata = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
