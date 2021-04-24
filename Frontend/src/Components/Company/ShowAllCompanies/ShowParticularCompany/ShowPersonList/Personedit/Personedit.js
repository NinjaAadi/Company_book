import React, { useState } from "react";
import classes from "./Personedit.module.css";
import editperson from "../../../../../../Utils/Editperson";
const Personedit = (props) => {
  const [msg, setmsg] = useState("");
  const toggler = props.toggler;
  const [res, setres] = useState({
    C_ID: props.person["C_ID"],
    p_id: props.person["ID"],
    NAME: props.person["NAME"],
    EMAIL: props.person["EMAIL"],
    MOBILE: props.person["MOBILE"],
    DESIGNATION: props.person["DESIGNATION"],
  });
  const onSubmit = async (e) => {
    const resp = await editperson(res);
    if (resp === false) {
      setmsg("Please enter a valid name!");
      setInterval(() => {
        setmsg("");
      }, 2000);
    } else {
      toggler();
    }
  };
  const onchange = (e) => {
    setres({ ...res, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes["body"]}>
      <div className={classes["form"]}>
        <input
          value={res.NAME}
          onChange={(e) => onchange(e)}
          className={classes["input"]}
          type="text"
          placeholder="Name"
          name="NAME"
        />
        <input
          value={res.EMAIL}
          onChange={(e) => onchange(e)}
          className={classes["input"]}
          type="text"
          placeholder="Email"
          name="EMAIL"
        />
        <input
          value={res.MOBILE}
          onChange={(e) => onchange(e)}
          className={classes["input"]}
          type="text"
          placeholder="Phone"
          name="MOBILE"
        />
        <input
          value={res.DESIGNATION}
          onChange={(e) => onchange(e)}
          className={classes["input"]}
          type="text"
          placeholder="Designation"
          name="DESIGNATION"
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

export default Personedit;
