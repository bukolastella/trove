import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import PortfolioData from "./PortfolioData";
import PortfolioRow from "./PortfolioRow";
import SideBar from "./SideBar";
import classes from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Update from "../update/Update";
import HomeHeader from "./HomeHeader";
import Loan from "../loan/Loan";
import Payloan from "../loan/Payloan";
import { pageActions } from "../../store/page-slice";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../Firestore/Firestore";

const HomePage = () => {
  const pagePath = useSelector((state: RootState) => state.page.pagePath);
  const [menuState, setMenuState] = useState(false);
  const [dataState, setDataState] = useState(0);
  const dispatch = useDispatch();
  const onLoan = useSelector((state: RootState) => state.page.onloan);
  const menuToggleHangler = () => {
    setMenuState(true);
  };
  const closeMenu = () => {
    setMenuState(false);
  };
  useEffect(() => {
    const getUser = async () => {
      const citiesRef = collection(db, "troveusers");
      const q = query(citiesRef, where("user", "==", "testoooo"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch(pageActions.setOnLoan(doc.data().paidloan === 0));
        dispatch(pageActions.setUserData(doc.data()));
      });
    };
    getUser();
  }, [dispatch]);
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
      {pagePath === "/loan" && !onLoan && (
        <Loan menuToggleHangler={menuToggleHangler} />
      )}
      {pagePath === "/loan" && onLoan && (
        <Payloan menuToggleHangler={menuToggleHangler} />
      )}
    </div>
  );
};

export default HomePage;
