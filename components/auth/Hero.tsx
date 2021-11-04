/* eslint-disable @next/next/no-img-element */
import React from "react";
import classes from "./Hero.module.css";
import heroImage1 from "../../public/app-1.png";
import heroImage from "../../public/app.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={classes.Hero}>
      <div className={classes.Title}>
        <h1>TROVE</h1>
        <h3>Investing Simplified</h3>
      </div>
      <div className={classes.Heroimg}>
        <img src={heroImage1.src} alt="hero" />
        <img src={heroImage.src} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
