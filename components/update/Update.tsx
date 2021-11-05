import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import HomeHeader from "../homepage/HomeHeader";
import classes from "./Update.module.css";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";

interface Props {
  menuToggleHangler: () => void;
}

const Update: React.FC<Props> = ({ menuToggleHangler }) => {
  const [userFocus, setUserFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const [newUser, setNewUser] = useState(user?.displayName);
  const [newPassword, setNewPassword] = useState("");
  console.log(user?.displayName);
  const submitHandler = () => {
    if (user != null) {
      if (newUser?.trim().length === 0 || newUser === user.displayName) {
        setNewUser(user.displayName);
        return;
      } else {
        updateProfile(user, {
          displayName: newUser,
        })
          .then(() => {})
          .catch((error) => console.log(error));
      }

      //
      if (newPassword === "12345") return;
      else {
        updatePassword(user, newPassword);
      }
    }
  };
  return (
    <div className={classes.update}>
      <HomeHeader menuToggleHangler={menuToggleHangler} name="Profile" />
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
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
      </div>
      <div className={classes.fieldGrid}>
        <label>password</label>
        {!passwordFocus && (
          <input
            type="password"
            value={"12345"}
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
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
      </div>
      <div className={classes.submit}>
        <button onClick={submitHandler}>Save changes</button>
      </div>
    </div>
  );
};

export default Update;
