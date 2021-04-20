import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./Field.module.css";
import DeletePopup from "../DeletePop/DeletePopup";
//Import action files
import { getfields } from "../../Actions/Getfields";

//util to create new field
import createfield from "../../Utils/CreateField";
const Field = (props) => {
  const history = useHistory();

  const [fname, setfname] = useState("");
  const [message, setmessage] = useState("");
  const [toggler, settoggler] = useState(false);
  const [name, setnamedelete] = useState();
  const onchange = (e) => {
    setfname(e.target.value);
  };

  const toggle = () => {
    if (toggler == false) {
      settoggler(true);
    } else {
      settoggler(false);
    }
  };

  const setnametodelete = (e, name) => {
    setnamedelete(name);
    toggle();
  };
  const fieldname = fname;

  //Function to create field
  const create_field = async (e) => {
    e.preventDefault();
    const ans = await createfield(fname);
    if (ans) {
      setmessage(
        <p style={{ color: "green" }}>Field registered successfully</p>
      );
      setfname("");
      async function fetchfield() {
        await props.getfields();
      }
      fetchfield();
      setTimeout(() => {
        setmessage("");
      }, 2000);
    } else {
      setmessage(
        <p style={{ color: "red" }}>Oops! Field cannot be registered</p>
      );
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };

  useEffect(() => {
    async function fetchfield() {
      await props.getfields();
    }
    fetchfield();
  }, []);

  if (props.fields.isfetched === false) {
    return <div>Not Fetcheds</div>;
  } else {
    return (
      <Fragment>
        {toggler == true ? (
          <DeletePopup p_value={name} />
        ) : (
          <Fragment></Fragment>
        )}
        <div className={classes["body"]}>
          <div className={classes["head"]}>
            <h1 className={classes["h1"]}>User Defined Fields</h1>
          </div>
          <hr />
          <br />

          <div className={classes["form"]}>
            <input
              name="name"
              value={fieldname}
              onChange={(e) => onchange(e)}
              className={classes["name"]}
              type="text"
              placeholder="Enter new field name"
            />
            <button
              onClick={(e) => create_field(e)}
              className={classes["btn-1"]}
            >
              <i class="fas fa-plus-square"></i> Create
            </button>
            <div>{message}</div>
          </div>

          <br />
          <table className={classes["table"]}>
            <tr>
              <th className={classes["th"]}>ID</th>
              <th className={classes["th"]}>
                <b>NAME</b>
              </th>
              <th className={classes["th"]}> </th>
              <th className={classes["th"]}> </th>
            </tr>
            {props.fields.c_fields.map((i) => {
              if (i.ISORIGINAL === 0) {
                return (
                  <tr>
                    <td className={classes["td"]}>{i.ID}</td>
                    <td className={classes["td"]}>{i.NAME}</td>
                    <td className={classes["td"]}>
                      <i
                        onClick={(e) => setnametodelete(e, i.NAME)}
                        style={{ color: "red" }}
                        class="fas fa-trash-alt"
                      ></i>
                    </td>
                    <td
                      style={{ color: "darkgreen" }}
                      className={classes["td"]}
                    >
                      <i class="far fa-edit"></i>
                    </td>
                  </tr>
                );
              }
            })}
          </table>
          <hr />
        </div>
      </Fragment>
    );
  }
};

Field.propType = {
  getfields: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  fields: state.Field,
});
export default connect(mapStateToProps, { getfields })(Field);
