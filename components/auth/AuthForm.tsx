/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import classes from "./AuthForm.module.css";
import googlelogo from "../../assests/14a344191a53331015b7.svg";
import logo from "../../public/logo.png";
import { auth } from "../../Firestore/Firestore";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page-slice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signUpState, setSignUpState] = useState(false);
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userState, setUserState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [checkState, setCheckState] = useState(false);

  const googleSignin = () => {
    dispatch(pageActions.setLoadingState(true));
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        dispatch(pageActions.setLoadingState(false));
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setEmailError(errorMessage);
        dispatch(pageActions.setLoadingState(false));
      });
  };
  const submitHandler = () => {
    //validation if the fields are empty
    userBlurHandler();
    emailBlurHandler();
    passwordBlurHandler();
    //
    if (signUpState) {
      //validation if the fields are empty
      if (
        userState.trim().length === 0 ||
        emailState.trim().length === 0 ||
        passwordState.trim().length === 0
      ) {
        return;
      }
      //validation if the error fields are filled-not empty
      if (
        userError.trim().length !== 0 ||
        emailError.trim().length !== 0 ||
        passwordError.trim().length !== 0
      ) {
        return;
      } else {
        dispatch(pageActions.setLoadingState(true));
        auth
          .createUserWithEmailAndPassword(emailState, passwordState)
          .then((cred: any) => {
            cred.user.updateProfile({
              displayName: userState,
            });
            dispatch(pageActions.setLoadingState(false));
            router.push("/dashboard");
          })
          .catch((error) => {
            dispatch(pageActions.setLoadingState(false));
            setEmailError(error.message);
            console.log(error.message);
          });
      }
    }
    //sign in
    if (!signUpState) {
      //validation if the fields are empty
      if (emailState.trim().length === 0 || passwordState.trim().length === 0) {
        return;
      }
      if (emailError.trim().length !== 0 || passwordError.trim().length !== 0) {
        return;
      } else {
        dispatch(pageActions.setLoadingState(true));
        auth
          .signInWithEmailAndPassword(emailState, passwordState)
          .then(() => {
            dispatch(pageActions.setLoadingState(false));
            router.push("/dashboard");
          })
          .catch((error) => {
            dispatch(pageActions.setLoadingState(false));
            setEmailError(error.message);
            console.log(error.message);
          });
      }
    }
  };
  const userBlurHandler = () => {
    userState.trim().length === 0 &&
      setUserError("please fill in your username");
    userState.trim().length > 0 && setUserError("");
  };
  const emailBlurHandler = () => {
    let lastAtPos = emailState.lastIndexOf("@");
    let lastDotPos = emailState.lastIndexOf(".");
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        emailState.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        emailState.length - lastDotPos > 2
      )
    ) {
      setEmailError("email is not valid");
    } else {
      setEmailError("");
    }
  };
  const passwordBlurHandler = () => {
    passwordState.trim().length === 0 &&
      setPasswordError("please fill in your password");
    passwordState.trim().length < 5 &&
      passwordState.trim().length > 0 &&
      setPasswordError("password must be greater than four");
    passwordState.trim().length > 4 && setPasswordError("");
  };
  const clearStates = () => {
    setUserState("");
    setEmailState("");
    setPasswordState("");
    setCheckState(false);
    setUserError("");
    setPasswordError("");
    setEmailError("");
  };
  return (
    <div className={classes.Auth}>
      {/* sign in/ sign up block */}
      <div className={classes.flex1}>
        <div className={classes.sign}>
          <button
            className={`${signUpState && classes.inactive}`}
            onClick={() => {
              setSignUpState(false);
              clearStates();
            }}
          >
            sign in
          </button>
          <button
            className={`${!signUpState && classes.inactive}`}
            onClick={() => {
              setSignUpState(true);
              clearStates();
            }}
          >
            sign up
          </button>
        </div>
        <img src={logo.src} alt="logo" />
      </div>

      {/* username block */}
      {signUpState && (
        <div className={classes.inputblock}>
          <input
            type="text"
            placeholder="Username"
            value={userState}
            onBlur={userBlurHandler}
            onChange={(event) => setUserState(event.target.value)}
          />
          {userError && <span>{userError}</span>}
        </div>
      )}

      {/* email block */}
      <div className={classes.inputblock}>
        <input
          type="email"
          placeholder="Email"
          value={emailState}
          onBlur={emailBlurHandler}
          onChange={(event) => setEmailState(event.target.value)}
        />
        {emailError && <span>{emailError}</span>}
      </div>

      {/* password block */}
      <div className={classes.inputblock}>
        <input
          type="password"
          placeholder="Password"
          onBlur={passwordBlurHandler}
          value={passwordState}
          onChange={(event) => setPasswordState(event.target.value)}
        />
        {passwordError && <span>{passwordError}</span>}
      </div>

      {/* i agree/ Remember block */}
      <div className={classes.flex}>
        <span>
          <input
            type="checkbox"
            // required={signUpState ? true : false}
            className={classes.checkbox}
            onChange={(event) => setCheckState(event.target.checked)}
            checked={checkState}
          />
          <span className={classes.checklabel}>
            {signUpState ? "I agree to the Terms & Conditions" : "Remember me"}
          </span>
        </span>
        {!signUpState && (
          <span className={classes.forgot}>Forgot password?</span>
        )}
      </div>

      {/* sign up/let's go block */}
      <button className={classes.btn} onClick={submitHandler}>
        {signUpState ? "sign up" : "let's go!"}
      </button>
      {/* or block */}
      <div className={classes.orblock}>
        <hr /> <div>or</div>
        <hr />
      </div>

      {/* google btn block */}
      <button className={classes.googlebtn} onClick={googleSignin}>
        <img src={googlelogo.src} alt="google logo" />
        {signUpState ? "sign up with google" : "sign in with google"}
      </button>
    </div>
  );
};

export default AuthForm;
