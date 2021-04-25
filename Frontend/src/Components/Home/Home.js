import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import classes from "./Home.module.css";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  if (
    localStorage.getItem("email") != null ||
    localStorage.getItem("email") != undefined
  ) {
    history.push("/companies");
  }
  return (
    <div className={classes.home}>
      <div className={classes.heading}>
        <div className={classes.welmsg}>Welcome to Company Book</div>
      </div>
      <div className={classes.forms}>
        <Login />
        <SignUp />
      </div>
    </div>
  );
};

export default Home;
