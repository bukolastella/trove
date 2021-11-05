import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import HomePage from "../components/homepage/HomePage";
import { RootState } from "../store";
import { auth } from "../Firestore/Firestore";
import Spinner from "../components/Spinner/Spinner";

const Dashboard = () => {
  const loginState = useSelector((state: RootState) => state.auth.isLogin);
  auth.onAuthStateChanged((user) => {
    dispatch(authActions.setLogin(!!user));
  });
  const dispatch = useDispatch();
  return loginState && <HomePage />;
};

export default Dashboard;
