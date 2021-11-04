import { faBars, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import HomeHeader from "../homepage/HomeHeader";
import SideBar from "../homepage/SideBar";
import classes from "./Update.module.css";
import {
  getAuth,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";

interface Props {
  menuToggleHangler: () => void;
}

const Update: React.FC<Props> = ({ menuToggleHangler }) => {
  const [userFocus, setUserFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const [newUser, setNewUser] = useState(user?.displayName);
  const [newPassword, setNewPassword] = useState("jhshjkl");
  const submitHandler = () => {
    if (user != null) {
      updateProfile(user, {
        displayName: newUser,
      })
        .then(() => {})
        .catch((error) => console.log(error));
      //
      updatePassword(user, newPassword);
      console.log(user?.displayName, user?.email);
    }
  };
  return (
    <div className={classes.update}>
      <HomeHeader menuToggleHangler={menuToggleHangler} name="Update Profile" />
      <div className={classes.fieldGrid}>
        <label>Email</label>
        <input type="text" value={user?.email || ""} readOnly />
      </div>
      <div className={classes.fieldGrid}>
        <label>username</label>
        {!userFocus && <div className={classes.container}>{newUser}</div>}
        {userFocus && (
          <input
            type="text"
            value={newUser || ""}
            onChange={(event) => setNewUser(event.target.value)}
            autoFocus
            onBlur={() => setUserFocus(false)}
          />
        )}
        <span onClick={() => setUserFocus(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </span>
      </div>
      <div className={classes.fieldGrid}>
        <label>password</label>
        {!passwordFocus && (
          <input
            type="password"
            value={newPassword}
            readOnly
            style={{ cursor: "default", pointerEvents: "none" }}
          />
        )}
        {passwordFocus && (
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoFocus
            onBlur={() => setPasswordFocus(false)}
          />
        )}
        <span onClick={() => setPasswordFocus(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </span>
      </div>
      <div className={classes.submit}>
        <button onClick={submitHandler}>Save changes</button>
      </div>
    </div>
  );
};

export default Update;
