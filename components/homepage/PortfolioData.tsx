/* eslint-disable @next/next/no-img-element */
import React from "react";
import classes from "./PortfolioData.module.css";
import { data } from "./Data";
interface Props {
  dataState: number;
}
const PortfolioData: React.FC<Props> = ({ dataState }) => {
  return (
    <div className={classes.PortfolioData}>
      <div className={classes.header}>
        <span>{data[dataState].name}</span>
        <img src={data[dataState].img} alt="logo" />
      </div>
      <div className={classes.flex}>
        <span>total quantity</span>
        <span>{data[dataState].totalQuantity.toFixed(2)}</span>
      </div>
      <div className={classes.flex}>
        <span>equity value</span> <span>{data[dataState].equityValue}</span>
      </div>
      <div className={classes.flex}>
        <span>price per share</span>
        <span>{data[dataState].pricePerShare}</span>
      </div>
    </div>
  );
};

export default PortfolioData;
