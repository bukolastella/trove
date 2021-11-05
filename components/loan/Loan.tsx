import React, { useEffect, useState } from "react";
import HomeHeader from "../homepage/HomeHeader";
import classes from "./loan.module.css";
import { getDocs } from "firebase/firestore";
import { db } from "../../Firestore/Firestore";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page-slice";
import { addDoc, collection, query, where } from "firebase/firestore";
import Loader from "../Spinner/Loader";

interface Props {
  menuToggleHangler: () => void;
}
const Loan: React.FC<Props> = ({ menuToggleHangler }) => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState(false);
  const [monthly, setMonthly] = useState(0);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  if (loading) dispatch(pageActions.setLoadingState(true));
  const durationHandler = (event: any) => {
    setDuration(event.target.value);
    if (Number(event.target.value) > 12 || Number(event.target.value) < 6) {
      setDurationError(true);
    } else {
      setDurationError(false);
    }
  };
  const amountHandler = (event: any) => {
    setAmount(event.target.value);
    if (Number(event.target.value) > 6000 || Number(event.target.value) < 1) {
      console.log(Number(event.target.value) < 1);
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  };
  useEffect(() => {
    if (amountError || durationError) {
      setBtn(false);
    } else {
      setBtn(true);
      if (amount !== "" && duration !== "") {
        const installment = Number(
          (Number(amount) / Number(duration)).toFixed(2)
        );
        setMonthly(installment);
      }
    }
  }, [amountError, durationError, amount, duration]);

  const submitHandler = async () => {
    setLoading(true);
    await addDoc(collection(db, "troveusers"), {
      user: user?.displayName,
      loanamount: Number(amount),
      paidloan: 0,
      duration: Number(duration),
    });
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

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className={classes.loan}>
          <HomeHeader menuToggleHangler={menuToggleHangler} name="Loans" />
          <div className={classes.field}>
            <div className={classes.loanfield}>
              <label>Amount</label>
              <div className={classes.loaninput}>
                <input
                  type="number"
                  min={0}
                  value={amount}
                  autoFocus
                  onChange={amountHandler}
                />
                <span>$</span>
              </div>
              {amountError && (
                <span className={classes.error}>
                  amount should be more than 0 and less 6000
                </span>
              )}
            </div>
            <div className={classes.loanfield}>
              <label>Duration</label>
              <div className={classes.loaninput}>
                <input
                  type="number"
                  min={0}
                  value={duration}
                  onChange={durationHandler}
                />
                <span>month</span>
              </div>
              {durationError && (
                <span className={classes.error}>
                  duration should be between 6 - 12 months
                </span>
              )}
            </div>
          </div>

          <div className={classes.bottom}>
            <div className={classes.latter}>
              <label>monthly installment</label>
              <span>{`$${monthly || 0}`}</span>
            </div>
            <div className={classes.latter}>
              <label>portfolio value</label>
              <span>$10,000</span>
            </div>
          </div>
          <div className={classes.button}>
            <button
              className={`${!btn && classes.disabled}`}
              onClick={submitHandler}
            >
              Apply for a loan
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Loan;
