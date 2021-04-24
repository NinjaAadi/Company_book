import React, { useState, useEffect, Fragment } from "react";
import classes from "./ShowPComp.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { usehistory } from "react-dom";
//import the action files
import { getgroups } from "../../../../Actions/Getgroups";
import { getmodules } from "../../../../Actions/GetAllModules";
import { getfields } from "../../../../Actions/Getfields";
import { useHistory } from "react-router";
import { withRouter, Link } from "react-router-dom";
//import deletepopup component
import DeletePopup from "../../../DeletePop/DeletePopup";
import createperson from "../../../../Utils/Createperson";
//import the delete function
import deletecompany from "../../../../Utils/DeleteCompany";

//need to call all fields,modules and groups.... from server in useeffect

const ShowPComp = (props) => {
  const [toggler, settoggler] = useState(false);
  const [id, setid] = useState();
  const history = useHistory();

  //First set the details in localstorage
  let company;

  if (props.location.company !== undefined) {
    //get the company from props
    company = props.location.company;
    const res = JSON.stringify(props.location.company);
    localStorage.setItem("comp", res);
  } else {
    const comp = localStorage.getItem("comp");

    company = JSON.parse(comp);
  }

  /*------------------------Toggler 1--------------------- */
  const toggle = () => {
    if (toggler == false) {
      settoggler(true);
    } else {
      settoggler(false);
    }
  };
  const close = () => {
    settoggler(false);
  };
  const setidtodelete = (e, id) => {
    setid(id);
    toggle();
  };
  const [res, setres] = useState({
    C_ID: company["C_ID"],
    NAME: "",
    EMAIL: "",
    MOBILE: "",
    DESIGNATION: "",
  });
  const [errmsg, seterrmsg] = useState();
  //Set the person field object for creating a new object
  const setpersonfield = (e) => {
    setres({ ...res, [e.target.name]: e.target.value });
  };

  //Function when user creates a person
  const createper = async (e) => {
    //console.log(res);
    const result = await createperson(res);
    if (result === false) {
      seterrmsg(
        <p style={{ color: "red" }}>Error in inserting person's record</p>
      );
      setTimeout(() => {
        seterrmsg("");
      }, 2000);
    } else {
      seterrmsg(
        <p style={{ color: "green" }}>
          Successfully inserted a new person's record
        </p>
      );
      setTimeout(() => {
        seterrmsg("");
      }, 2000);
    }
  };
  useEffect(() => {
    async function fetchall() {
      await props.getgroups();
      await props.getmodules();
      await props.getfields();
    }
    fetchall();
  }, []);
  if (
    props.groups.isfetched === false ||
    props.modules.isfetched === false ||
    props.fields.isfetched === false
  ) {
    return <div>Not fetched</div>;
  }

  //get the groups
  const allgroups = props.groups.c_groups;

  //get the modules
  const allmodules = props.modules.c_modules;

  //get the fields
  const fields = props.fields.c_fields;

  //map the company groups and fields

  const c_g = company.C_G_ID;
  const c_m = company.C_M_ID;
  const c_groups = [];
  const c_modules = [];
  for (var i = 0; i < c_g.length; i++) {
    let id = c_g[i];
    for (var j = 0; j < allgroups.length; j++) {
      if (allgroups[j].G_ID == id) {
        c_groups.push(allgroups[j].G_NAME);
      }
    }
  }
  for (i = 0; i < c_m.length; i++) {
    let id = c_m[i];
    for (j = 0; j < allmodules.length; j++) {
      if (allmodules[j].M_ID == id) {
        c_modules.push(allmodules[j].M_NAME);
      }
    }
  }
  const comp_arr = Object.entries(company);
  const comp_obj = [];
  for (var i = 0; i < comp_arr.length; i++) {
    let value = comp_arr[i][1];
    if (comp_arr[i][1] instanceof Array) {
      continue;
    }
    if (!value) {
      value = "null";
    }
    let key = comp_arr[i][0];
    if (key == "C_ACTIVE") {
      continue;
    }
    if (key == "C_CREATED_AT") {
      const temp = Date.parse(value);
      const showdate = new Date(temp);
      value = showdate.toString().substr(0, 15);
    }
    if (key == "C_COUNTRY") {
      const temp = JSON.parse(value);
      value = temp["label"];
    }
    comp_obj.push({
      key: key,
      value: value,
    });
  }
  let msg;
  let msg2;
  let clr;
  if (c_modules.length === 0) {
    msg = "No modules set for this company!";
  }
  if (c_groups.length === 0) {
    msg2 = "No groups set for this company!";
  }
  if (company["C_ACTIVE"] == 1) {
    clr = <i style={{ color: "green" }} class="fas fa-circle"></i>;
  } else {
    clr = <i style={{ color: "red" }} class="fas fa-circle"></i>;
  }

  return (
    <div className={classes["body"]}>
      {toggler == true ? (
        <DeletePopup
          p_value={id}
          toggler={close}
          mainfunc={deletecompany}
          reroute="/companies"
        />
      ) : (
        <Fragment></Fragment>
      )}
      <h1 className={classes["head"]}>Details of company : {company.C_NAME}</h1>
      <br />
      <br />
      <div className={classes["deledit"]}>
        <Link
          to={{
            pathname: "/editcompany",
            company: JSON.parse(localStorage.getItem("comp")),
          }}
        >
          <button className={classes["edit"]}>
            Edit <i class="fas fa-edit"></i>
          </button>
        </Link>

        <button
          onClick={(e) => setidtodelete(e, company.C_ID)}
          className={classes["delete"]}
        >
          Delete <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <hr style={{ width: "80%", color: "grey" }} />
      <div className={classes["module"]}>
        <h3 style={{ textAlign: "left", color: "#007965" }}>
          Company_Modules <i class="fas fa-tags"></i>
        </h3>
        <div className={classes["flex"]}>
          {c_modules.map((i) => {
            return <p className={classes["p"]}>{i}</p>;
          })}
        </div>
        {msg}
      </div>
      <div className={classes["module"]}>
        <h3 style={{ textAlign: "left", color: "#007965" }}>
          Company_Groups <i class="fas fa-layer-group"></i>
        </h3>
        <div className={classes["flex"]}>
          {c_groups.map((i) => {
            return <p className={classes["p"]}>{i}</p>;
          })}
        </div>
        {msg2}
      </div>
      <br />
      <hr style={{ width: "80%", color: "grey" }} />
      <table className={classes["table"]}>
        <tr>
          <th className={classes["th"]}>Field</th>
          <th className={classes["th-1"]}>
            <b>Value</b>
          </th>
          <th className={classes["th"]}></th>
          <th className={classes["th"]}> </th>
        </tr>
        <tr className={classes["tr"]}>
          <td className={classes["td"]}>ACTIVE STATUS</td>
          <td className={classes["td-1"]}>{clr}</td>
        </tr>
        {comp_obj.map((item) => {
          return (
            <tr className={classes["tr"]}>
              <td className={classes["td"]}>{item["key"]}</td>
              <td className={classes["td-1"]}>{item["value"]}</td>
            </tr>
          );
        })}
      </table>
      <div className={classes["buttons"]}>
        <button
          className={classes["btn"]}
          onClick={(e) => {
            history.push("/company/personlist");
          }}
        >
          Click here to view registered people{" "}
          <i class="fas fa-user-friends"></i>
        </button>
      </div>
      <div className={classes["form"]}>
        <h2>Insert a person's record in {company.C_NAME}</h2>
        <br />
        <hr />
        <p>Name:</p>
        <input
          name="NAME"
          className={classes["input"]}
          type="text"
          onChange={(e) => setpersonfield(e)}
        />
        <p>Email:</p>
        <input
          name="EMAIL"
          className={classes["input"]}
          type="text"
          onChange={(e) => setpersonfield(e)}
        />
        <p>Mobile:</p>
        <input
          name="MOBILE"
          className={classes["input"]}
          type="text"
          onChange={(e) => setpersonfield(e)}
        />
        <p>Designation:</p>
        <input
          name="DESIGNATION"
          className={classes["input"]}
          type="text"
          onChange={(e) => setpersonfield(e)}
        />
        {errmsg}
        <button
          onClick={(e) => createper(e)}
          className={classes["btn"]}
          style={{ display: "block", marginTop: "20px" }}
        >
          Create <i class="fas fa-pen"></i>
        </button>
      </div>
    </div>
  );
};
ShowPComp.propType = {
  getgroups: PropTypes.func.isRequired,
  getfields: PropTypes.func.isRequired,
  getmodules: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
  module: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  groups: state.Group,
  modules: state.Module,
  fields: state.Field,
});
export default withRouter(
  connect(mapStatetoProps, { getgroups, getmodules, getfields })(ShowPComp)
);
