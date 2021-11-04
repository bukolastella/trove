import { createSlice } from "@reduxjs/toolkit";
const pageSlice = createSlice({
  name: "page",
  initialState: {
    pagePath: "/dashboard",
  },
  reducers: {
    setPagePath(state, action) {
      state.pagePath = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
