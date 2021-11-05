import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import HomeHeader from "../homepage/HomeHeader";
import classes from "./Payloan.module.css";
import { PaystackButton } from "react-paystack";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firestore/Firestore";
import { pageActions } from "../../store/page-slice";

interface Props {
  menuToggleHangler: () => void;
}

const Payloan: React.FC<Props> = ({ menuToggleHangler }) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: RootState) => state.page.userdata);
  const useremail = useSelector((state: RootState) => state.page.useremail);
  const userid = useSelector((state: RootState) => state.page.userid);
  const monthlymoney = Math.ceil(userdata.loanamount / userdata.duration);
  const publicKey = process.env.NEXT_PUBLIC_API_KEY || "";
  const componentProps = {
    email: useremail,
    amount: monthlymoney * 100,
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: async () => {
      alert(
        `Hey, ${userdata.user}. monthly installment of $${monthlymoney} was successful! `
      );

      dispatch(
        pageActions.setUserData({
          ...userdata,
          paidloan: userdata.paidloan + monthlymoney,
        })
      );
      await setDoc(doc(db, "troveusers", userid), {
        ...userdata,
        paidloan: userdata.paidloan + monthlymoney,
      });
      if (userdata.paidloan + monthlymoney >= userdata.loanamount) {
        await deleteDoc(doc(db, "troveusers", userid));
        dispatch(pageActions.setOnLoan(false));
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };
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
        <span>{`$${Math.ceil(userdata.loanamount / userdata.duration)}`}</span>
      </div>
      <div className={classes.box}>
        <label>Duration</label>
        <span>{`${userdata.duration}`}</span>
      </div>
      <div className={classes.button}>
        <PaystackButton {...componentProps} />
      </div>
    </div>
  );
};

export default Payloan;
export async function getServerSideProps() {
  return {
    props: {},
  };
}
