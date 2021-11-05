import React from "react";
import Spinner from "./Spinner";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.Loader}>
      <Spinner />
    </div>
  );
};

export default Loader;
