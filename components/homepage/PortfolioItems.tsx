import React from "react";
import classes from "./PortfolioItem.module.css";

interface Props {
  title: string;
  value: string;
  icon: any;
  active?: boolean;
  notSelectable?: boolean;
  changeDataState?: (data: number) => void;
}

const PortfolioItems: React.FC<Props> = ({
  title,
  value,
  icon,
  active,
  notSelectable,
  changeDataState,
}) => {
  const changeData = () => {
    if (title === "Amazon") changeDataState && changeDataState(0);
    if (title === "Tesla") changeDataState && changeDataState(1);
    if (title === "Apple") changeDataState && changeDataState(2);
  };
  return (
    <div
      className={`${classes.PortfolioItems} ${active && classes.active} ${
        notSelectable && classes.notSelectable
      }`}
      onClick={changeData}
    >
      {icon}
      <div>{title}</div>
      <span>{value}</span>
    </div>
  );
};

export default PortfolioItems;
