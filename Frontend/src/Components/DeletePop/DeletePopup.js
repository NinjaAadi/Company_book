import React from "react";
import classes from "./DeletePopup.module.css";
const DeletePopup = (props) => {
  const exefunc = props.mainfunc;
  const p_value = props.p_value;
  const toggler = props.toggler;
  

  //On success call call the function that is being passed
  return (
    <div className={classes["body"]}>
      <p style={{ color: "red" }}>Are you sure you want to delete?</p>
      <div className={classes["btn-div"]}>
        <button className={classes["succ"]}>Yes</button>
        <button className={classes["fail"]}>No</button>
      </div>
    </div>
  );
};

export default DeletePopup;
