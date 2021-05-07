import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import { Link, useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();

  const [toggleOn, setToggleOn] = useState(true);
  const toggleIcon = () => {
    if (toggleOn === true) {
      setToggleOn(false);
    } else {
      setToggleOn(true);
    }
  };
  const logout = (e) => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("comp");
    history.push("/");
  };
  return (
    <>
      <div className={classes.Navbar}>
        <div className={classes.title}>Company Book</div>
        <ul className={toggleOn ? classes.navLinks : classes.navLinksActive}>
          <li>
            <Link to="/companies">Home</Link>
          </li>
          <li>
            <Link to="/createcompany">Add company</Link>
          </li>
          <li>
            <Link to="/custom_fields">Fields</Link>
          </li>
          <li>
            <Link to="/groups">Groups</Link>
          </li>
          <li>
            <Link to="/modules">Modules</Link>
          </li>
          <li>
            <Link to="/backupandrestore">Backup/Restore</Link>
          </li>
          <li
            style={{ cursor: "pointer", color: "white" }}
            onClick={(e) => logout(e)}
          >
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
