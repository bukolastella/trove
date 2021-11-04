import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./HomeHeader.module.css";

interface Props {
  menuToggleHangler: () => void;
  name: string;
}
const HomeHeader: React.FC<Props> = ({ menuToggleHangler, name }) => {
  return (
    <div className={classes.Title}>
      <span onClick={menuToggleHangler}>
        <FontAwesomeIcon icon={faBars} />
      </span>
      <span>{name}</span>
    </div>
  );
};

export default HomeHeader;
