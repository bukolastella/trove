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
    useremail: "",
    userid: "",
    isLoading: false,
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
    setUserEmail(state, action) {
      state.useremail = action.payload;
    },
    setUserId(state, action) {
      state.userid = action.payload;
    },
    setLoadingState(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
