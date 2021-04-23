import React, { useState } from "react";
import classes from "./EditPop.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const EditPop = (props) => {
  const toggler = props.toggler;
  const execfunc = props.mainfunc;
  const id = props.id;
  const oldname = props.oldname;
  const [newname, setname] = useState(oldname);
  const [msg, setmsg] = useState("");
  const name = newname;
  const onchange = (e) => {
    setname(e.target.value);
  };

  //Run the executable function
  const onSubmit = async (e) => {
    const fields = props.fields;
    let isvalid = true;
    fields.map((f) => {
      if (f.G_NAME == newname) {
        isvalid = false;
      }
    });
    if (isvalid === false) {
      setmsg("Name already exists!");
      return;
    }
    const res = await execfunc(id, newname);
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
EditPop.propTypes = {
  fields: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  fields: state.Group.c_groups,
});
export default connect(mapStateToProps, {})(EditPop);
