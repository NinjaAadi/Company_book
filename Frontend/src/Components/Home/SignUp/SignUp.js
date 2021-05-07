import React, { useState } from "react";
import classes from "./Signup.module.css";
import SignUpUser from "../../../Utils/SignUpUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import { useHistory } from "react-router";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const history = useHistory();
  const signUp = async (e) => {
    e.preventDefault();
    const res = await SignUpUser(name, email, password, adminPassword);

    if (res == true) {
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
      history.push("/companies");
    } else {
      if (!validator.isEmail(email)) {
        setSignUpMessage("invalid email");
        setTimeout(() => {
          setSignUpMessage("");
        }, 1500);
      } else {
        setSignUpMessage("Invalid admin password");
        setTimeout(() => {
          setSignUpMessage("");
        }, 1500);
      }
    }
  };

  const PasswordVisibility = (e) => {
    e.preventDefault();
    let x = document.getElementById("signupPass");
    if (x.type == "password") x.type = "text";
    else x.type = "password";
  };

  return (
    <>
      <div className={classes.signup}>
        <div className={classes.innerSignup}>
          <div className={classes.signupMessage}>{signUpMessage}</div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSignUpMessage("");
            }}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSignUpMessage("");
            }}
            placeholder="Email"
          />
          <input
            id="signupPass"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setSignUpMessage("");
            }}
            placeholder="Password"
          />
          <FontAwesomeIcon
            className={classes.icon}
            icon={faEye}
            onClick={(e) => {
              PasswordVisibility(e);
            }}
          />

          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Admin Password"
          />
          <button
            className={classes.SignupButton}
            onClick={(e) => {
              signUp(e);
            }}
          >
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
