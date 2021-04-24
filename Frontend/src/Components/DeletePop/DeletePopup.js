import React from "react";
import classes from "./DeletePopup.module.css";

import { useHistory } from "react-router";
const DeletePopup = (props) => {
  const history = useHistory();
  const exefunc = props.mainfunc;
  const p_value = props.p_value;
  const toggler = props.toggler;

  //On fail just hide the toggler
  const onfail = (e) => {
    toggler();
  };

  //On success click run the executable function
  const onsuccess = async (e) => {
    e.preventDefault();
    const res = await exefunc(p_value);
    if (props.reroute) {
      history.push(props.reroute);
    }
    toggler();
  };
  return (
    <div className={classes["body"]}>
      <p style={{ color: "red" }}>Are you sure you want to delete?</p>
      <div className={classes["btn-div"]}>
        <button className={classes["succ"]} onClick={(e) => onsuccess(e)}>
          <i class="fas fa-trash"></i> Yes
        </button>
        <button className={classes["fail"]} onClick={(e) => onfail(e)}>
          <i class="fas fa-times-circle"></i> No
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
