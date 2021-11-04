import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import { combineReducers } from "redux";
import pageSlice from "./page-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, page: pageSlice.reducer },
});

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  page: pageSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default store;
