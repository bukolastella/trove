import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthForm from "../auth/AuthForm";
import Hero from "../auth/Hero";
import Loader from "../Spinner/Loader";
import classes from "./AuthPages.module.css";

const AuthPages = () => {
  const loading = useSelector((state: RootState) => state.page.isLoading);
  console.log(loading);
  return (
    <>
      {!loading && (
        <div className={classes.AuthPages}>
          <Hero />
          <AuthForm />
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default AuthPages;
