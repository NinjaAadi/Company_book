import React, { useState } from "react";
import classes from "./EditPop.module.css";
const EditPop = (props) => {
  const toggler = props.toggler;
  const execfunc = props.mainfunc;
  const oldname = props.oldname;
  const [newname, setname] = useState(oldname);
  const [msg, setmsg] = useState("");
  const name = newname;
  const onchange = (e) => {
    setname(e.target.value);
  };

  //Run the executable function
  const onSubmit = async (e) => {
    const res = await execfunc(oldname, newname);
    if (res === false) {
      setmsg("Please enter a valid name!");
      setInterval(() => {
        setmsg("");
      }, 2000);
    } else {
      toggler();
    }
  };
  return (
    <div className={classes["body"]}>
      <div className={classes["form"]}>
        <p>Enter New Name : </p>
        <input
          value={name}
          onChange={(e) => onchange(e)}
          className={classes["input"]}
          type="text"
          placeholder="New Name"
        />
        <button onClick={(e) => onSubmit(e)} className={classes["btn"]}>
          <i class="fas fa-pen"></i> Update
        </button>
        <button onClick={(e) => toggler(e)} className={classes["btn-2"]}>
          <i class="fas fa-times-circle"></i>
        </button>
        <p style={{ color: "red" }}>{msg}</p>
      </div>
    </div>
  );
};

export default EditPop;
