import axios from "axios";
import React, { useState } from "react";
import classes from "./Login.module.css";
import LoginUser from "../../../Utils/LoginUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import e from "cors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const login = async (e) => {
    e.preventDefault();
    const res = await LoginUser(email, password,loginMessage);

    if (res === true) {
      //redirect to company page
    } else {
      setLoginMessage("INCORRECT USER NAME OR PASSWORD");
    }
  };

  const PasswordVisibility = (e) =>{
        e.preventDefault();
        let x = document.getElementById("inputPass");
        if(x.type=="password")
          x.type="text";
        else
          x.type="password"
  }

  return (
    <>
      <div className={classes.login}>
        
        <div className={classes.innerLogin}>
          <div className={classes.loginMessage}>{loginMessage}</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setLoginMessage("");
            }}
          />
          <input
            id="inputPass"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
               setLoginMessage("");
              }}
          />
          <FontAwesomeIcon
            className={classes.icon}
            icon={faEye}
            onClick={(e) => {
              PasswordVisibility(e);
            }}
          />
          <button
            className={classes.LoginButton}
            onClick={(e) => {
              login(e);
            }}
          >
            LogIn
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
