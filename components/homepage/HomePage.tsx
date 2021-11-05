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
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../Firestore/Firestore";
import { getAuth } from "firebase/auth";

const HomePage = () => {
  const pagePath = useSelector((state: RootState) => state.page.pagePath);
  const userid = useSelector((state: RootState) => state.page.userid);
  const [menuState, setMenuState] = useState(false);
  const [dataState, setDataState] = useState(0);
  const dispatch = useDispatch();
  const onLoan = useSelector((state: RootState) => state.page.onloan);
  const auth = getAuth();
  const user = auth.currentUser;
  const menuToggleHangler = () => {
    setMenuState(true);
  };
  const closeMenu = () => {
    setMenuState(false);
  };
  dispatch(pageActions.setUserEmail(user?.email));
  useEffect(() => {
    const getUser = async () => {
      const citiesRef = collection(db, "troveusers");
      const q = query(citiesRef, where("user", "==", user?.displayName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch(
          pageActions.setOnLoan(
            doc.data().paidloan === 0 ? true : !!doc.data().paidloan
          )
        );
        dispatch(pageActions.setUserData(doc.data()));
        dispatch(pageActions.setUserId(doc.id));
      });
    };
    getUser();
  }, [dispatch, user?.email, userid, user?.displayName]);
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
