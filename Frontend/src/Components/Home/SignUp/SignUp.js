import React, { useState } from "react";
import classes from "./Signup.module.css";
import SignUpUser from "../../../Utils/SignUpUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import validator from 'validator';
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    const res = await SignUpUser(name, email, password, adminPassword);
    
      if (res == true) {
        setSignUpMessage("SUCCESSFULLY REGISTERED");
      } else {

        if (!validator.isEmail(email)) {
          setSignUpMessage("invalid email");
        }
        // else if(password.length<6)
        //     setSignUpMessage("password must be of atleast 6 characters");

      else  if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
        {
          setSignUpMessage("weak password")
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
