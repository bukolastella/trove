import React from "react";
import AuthForm from "../auth/AuthForm";
import Hero from "../auth/Hero";
import classes from "./AuthPages.module.css";

const AuthPages = () => {
  return (
    <div className={classes.AuthPages}>
      <Hero />
      <AuthForm />
    </div>
  );
};

export default AuthPages;
