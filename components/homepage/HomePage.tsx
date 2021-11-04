import React, { useState } from "react";
import Chart from "./Chart";
import PortfolioData from "./PortfolioData";
import PortfolioRow from "./PortfolioRow";
import SideBar from "./SideBar";
import classes from "./HomePage.module.css";
import { faBars, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Update from "../update/Update";
import HomeHeader from "./HomeHeader";
import Loan from "../loan/Loan";

const HomePage = () => {
  const pagePath = useSelector((state: RootState) => state.page.pagePath);
  const [menuState, setMenuState] = useState(false);
  const [dataState, setDataState] = useState(0);
  const menuToggleHangler = () => {
    setMenuState(true);
  };
  const closeMenu = () => {
    setMenuState(false);
  };
  return (
    <div className={classes.HomePage}>
      <SideBar menuState={menuState} closeMenu={closeMenu} />
      {pagePath === "/dashboard" && (
        <div className={classes.Home}>
          <HomeHeader menuToggleHangler={menuToggleHangler} name="Dashboard" />
          <PortfolioRow setDataState={(data) => setDataState(data)} />
          <PortfolioData dataState={dataState} />
          <div className={classes.HomeChart}>
            <Chart />
          </div>
        </div>
      )}
      {pagePath === "/update" && (
        <Update menuToggleHangler={menuToggleHangler} />
      )}
      {pagePath === "/loan" && <Loan menuToggleHangler={menuToggleHangler} />}
    </div>
  );
};

export default HomePage;
