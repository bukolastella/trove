import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import HomeHeader from "../homepage/HomeHeader";
import classes from "./Payloan.module.css";
interface Props {
  menuToggleHangler: () => void;
}
const Payloan: React.FC<Props> = ({ menuToggleHangler }) => {
  const userdata = useSelector((state: RootState) => state.page.userdata);
  return (
    <div className={classes.paybox}>
      <HomeHeader menuToggleHangler={menuToggleHangler} name="Loans" />
      <div className={classes.box}>
        <label>Total Loan</label>
        <span>{`$${userdata.loanamount}`}</span>
      </div>
      <div className={classes.box}>
        <label>Upaid Loan</label>
        <span>{`$${userdata.loanamount - userdata.paidloan}`}</span>
      </div>
      <div className={classes.box}>
        <label>Monthly Installation</label>
        <span>{`$${(userdata.loanamount / userdata.duration).toFixed(
          2
        )}`}</span>
      </div>
      <div className={classes.box}>
        <label>Duration</label>
        <span>{`${userdata.duration}`}</span>
      </div>
      <div className={classes.button}>
        <button>Pay loan</button>
      </div>
    </div>
  );
};

export default Payloan;
