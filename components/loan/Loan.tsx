import React from "react";
import HomeHeader from "../homepage/HomeHeader";
import classes from "./loan.module.css";

interface Props {
  menuToggleHangler: () => void;
}
const Loan: React.FC<Props> = ({ menuToggleHangler }) => {
  return (
    <div>
      <HomeHeader menuToggleHangler={menuToggleHangler} name="Update Profile" />
      <div>asjjkas</div>
    </div>
  );
};

export default Loan;
