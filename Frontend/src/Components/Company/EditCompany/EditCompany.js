import React, { useState, useEffect, Fragment, useMemo } from "react";
import classes from "./EditCompany.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import countryList from "react-select-country-list";
import Spinner from "../../Spinner/Spinner";
//import the action files
import { getgroups } from "../../../Actions/Getgroups";
import { getmodules } from "../../../Actions/GetAllModules";
import { getfields } from "../../../Actions/Getfields";
import getallcompanies from "../../../Actions/Company/Getallcompanies";
//import from utils
import editcompany from "../../../Utils/EditCompany";
import { useHistory } from "react-router";
const EditCompany = (props) => {
  //state for error message
  const [err, seterr] = useState("");
  const [prevobj, setprevobj] = useState({});
  //For country codes
  const [country, setcountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changecountry = (value) => {
    setcountry(value);
  };
  const [date, setdate] = useState(Date.now());
  const history = useHistory();
  const authemail = localStorage.getItem("email");
  const authpass = localStorage.getItem("password");
  if (authemail === null || authpass === null) {
    history.push("/");
  }
  useEffect(() => {
    async function fetchall() {
      await props.getgroups();
      await props.getmodules();
      await props.getfields();
      await props.getallcompanies();
    }
    fetchall();
  }, [err]);

  useEffect(() => {
    let company;
    if (
      props.location.company === undefined ||
      props.location.company === null
    ) {
      company = JSON.parse(localStorage.getItem("comp"));
    } else {
      company = props.location.company;
    }
    const comparr = Object.entries(company);
    const newobj = {};
    for (var i = 0; i < comparr.length; i++) {
      const keyy = comparr[i][0];
      let value = comparr[i][1];
      if (keyy instanceof Array) {
        continue;
      }
      if (keyy == "C_PERSON") {
        continue;
      }
      if (value === null || value === undefined) {
        value = "null";
      }
      newobj[keyy] = value;
    }
    setprevobj(newobj);
    console.log(company["C_CREATED_AT"]);
    console.log(Date.parse(company["C_CREATED_AT"]));
    const nd = new Date(Date.parse(company["C_CREATED_AT"]));
    console.log(nd);
    setdate(nd);
    setcountry(JSON.parse(company["C_COUNTRY"]));
    console.log(newobj);
  }, []);

  //For groups
  let value;
  let isgroupedchanged = false;
  let def_g = [];
  let def_m = [];
  const handleOnchange = (val) => {
    isgroupedchanged = true;
    value = val;
  };

  //For modules
  let value2;
  let ismodulechanged = false;
  const handleOnchange2 = (val) => {
    ismodulechanged = true;
    value2 = val;
  };
  if (
    props.groups.isfetched === false ||
    props.modules.isfetched === false ||
    props.fields.isfetched === false
  ) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  //get the groups
  const allgroups = props.groups.c_groups;

  //get the modules
  const allmodules = props.modules.c_modules;

  //get the fields
  const fields = props.fields.c_fields;

  const res = {};
  fields.map((id) => {
    return (res[id.NAME] = "");
  });
  res["C_ACTIVE"] = 1;
  const onChange = (e) => {
    setprevobj({ ...prevobj, [e.target.name]: e.target.value });
  };

  const setdatemy = (date) => {
    console.log(typeof date);
    setdate(date);
  };

  //on form submission
  const create = async (e) => {
    if (
      props.location.company === undefined ||
      props.location.company === null
    ) {
      props.location.company = JSON.parse(localStorage.getItem("comp"));
    }
    if (isgroupedchanged === false) {
      value = props.location.company["C_G_ID"].join();
    }
    if (ismodulechanged === false) {
      value2 = props.location.company["C_M_ID"].join();
    }
    const res = { ...prevobj };

    res["C_COUNTRY"] = JSON.stringify(country);
    if (value != undefined && value != null && value.length != 0) {
      res["C_G_ID"] = value.split(",");
    } else {
      res["C_G_ID"] = [];
    }
    if (value2 != undefined && value2 != null && value2.length != 0) {
      res["C_M_ID"] = value2.split(",");
    } else {
      res["C_M_ID"] = [];
    }
    res["C_CREATED_AT"] = date.toString();
    var flag = 0;
    props.allcomp.map((c) => {
      if (res["C_NAME"] == c.C_NAME) {
        if (c.C_ID != res["C_ID"]) {
          flag = 1;
        }
      }
    });
    console.log(res);
    if (flag === 1 || res["C_NAME"].length == 0) {
      seterr(
        <p style={{ color: "red" }}>
          Cannot set/modify company.Either there exists a company with this name
          or there is
          <br /> some error!
        </p>
      );
      setTimeout(() => {
        seterr("");
      }, 2000);
      return;
    }
    const rres = await editcompany(res);
    if (rres == false) {
      seterr(
        <p style={{ color: "red" }}>
          Cannot set/modify company.Either there exists a company with this name
          or there is
          <br /> some error!
        </p>
      );
    } else {
      seterr(<p style={{ color: "green" }}>Company updated successfully!</p>);
    }
    setTimeout(() => {
      seterr("");
    }, 2000);
  };

  //Create the group array for dropdown
  const g_options = [];
  const m_options = [];
  let prev_g;
  let prev_m;
  if (props.location.company != null && props.location.company != undefined) {
    prev_g = props.location.company["C_G_ID"];
    prev_m = props.location.company["C_M_ID"];
  } else {
    let company = JSON.parse(localStorage.getItem("comp"));
    prev_g = company["C_G_ID"];
    prev_m = company["C_M_ID"];
  }

  //set default value of groups
  for (var i = 0; i < prev_g.length; i++) {
    let id = prev_g[i];
    allgroups.map((g) => {
      if (g.G_ID === id) {
        return def_g.push({
          label: g.G_NAME,
          value: g.G_ID,
        });
      }
    });
  }
  //set default value of modules
  for (var i = 0; i < prev_m.length; i++) {
    let id = prev_m[i];
    allmodules.map((g) => {
      if (g.M_ID === id) {
        return def_m.push({
          label: g.M_NAME,
          value: g.M_ID,
        });
      }
    });
  }
  allgroups.map((g) => {
    return g_options.push({
      label: g.G_NAME,
      value: g.G_ID,
    });
  });
  allmodules.map((m) => {
    return m_options.push({
      label: m.M_NAME,
      value: m.M_ID,
    });
  });

  return (
    <div className={classes["body"]}>
      <h1>
        Modify {prevobj["C_NAME"]}{" "}
        <i style={{ color: "#f58634" }} class="fas fa-building"></i>
      </h1>
      <br />
      <p style={{ color: "red" }}>
        Edit the groups and modules at the end!
      </p>
      <hr />
      <p className={classes["p"]}>
        Date{" "}
        <i
          style={{ fontSize: "8px", color: "red" }}
          class="fas fa-asterisk"
        ></i>
      </p>
      <div className={classes["date"]}>
        <DatePicker
          selected={date}
          onChange={(date) => setdatemy(date)}
          scrollableMonthYearDropdown
          showYearDropdown
        />
      </div>
      <br />
      <p style={{ color: "red" }}>
        <i
          style={{ fontSize: "8px", color: "red", marginRight: "5px" }}
          class="fas fa-asterisk"
        ></i>
        Groups and modules if not changed will be set to previous values!
        <br />
        If you select any new field, previously set values will be lost!
        <br />
        If you select no fields after modifying, previous data will be lost!
      </p>
      <p className={classes["p"]}>
        Groups{" "}
        <i
          style={{ fontSize: "8px", color: "red" }}
          class="fas fa-asterisk"
        ></i>
      </p>

      <MultiSelect onChange={handleOnchange} options={g_options} />
      <p className={classes["p"]}>
        Modules{" "}
        <i
          style={{ fontSize: "8px", color: "red" }}
          class="fas fa-asterisk"
        ></i>
      </p>
      <MultiSelect onChange={handleOnchange2} options={m_options} />
      <p className={classes["p"]}>
        Is Active?{" "}
        <i
          style={{ fontSize: "8px", color: "red" }}
          class="fas fa-asterisk"
        ></i>
      </p>
      <p style={{ color: "red" }}>
        <i
          style={{ fontSize: "8px", color: "red", marginRight: "5px" }}
          class="fas fa-asterisk"
        ></i>
        If not changed will be considered as default!
      </p>
      <select
        className={classes["sel"]}
        name="C_ACTIVE"
        onChange={(e) => onChange(e)}
      >
        <option className={classes["op"]} value="1">
          Select
        </option>
        <option className={classes["op"]} value="1">
          True
        </option>
        <option className={classes["op"]} value="0">
          False
        </option>
      </select>
      <p className={classes["p"]}>
        C_COUNTRY{" "}
        <i
          style={{ fontSize: "8px", color: "red" }}
          class="fas fa-asterisk"
        ></i>
      </p>
      <div className={classes["country"]}>
        <Select options={options} value={country} onChange={changecountry} />
      </div>

      {fields.map((it) => {
        if (
          it.NAME !== "C_ACTIVE" &&
          it.ISORIGINAL === 1 &&
          it.NAME !== "C_NOTES" &&
          it.NAME !== "C_CREATED_AT" &&
          it.NAME !== "C_COUNTRY"
        ) {
          return (
            <Fragment key={it.NAME}>
              <p className={classes["p"]}>
                {it.NAME}
                {"  "}
                <i
                  style={{ fontSize: "8px", color: "red" }}
                  class="fas fa-asterisk"
                ></i>
              </p>
              <input
                value={prevobj[it.NAME]}
                className={classes["input"]}
                type="text"
                name={it.NAME}
                onChange={(e) => onChange(e)}
              />
            </Fragment>
          );
        }
      })}
      <p className={classes["p"]}>
        C_NOTES
        {"  "}
        <i
          style={{ fontSize: "8px", color: "red" }}
          class="fas fa-asterisk"
        ></i>
      </p>
      <textarea
        style={{ fontSize: "1.3rem" }}
        className={classes["input-1"]}
        type="text"
        name="C_NOTES"
        value={prevobj["C_NOTES"]}
        onChange={(e) => onChange(e)}
      />
      <br />
      <br />
      <hr />
      <h2>CUSTOM FIELDS:</h2>
      <br />
      {fields.map((it) => {
        if (it.NAME !== "C_ACTIVE" && it.ISORIGINAL === 0) {
          return (
            <Fragment>
              <p className={classes["p"]}>
                {it.NAME}
                {"  "}
                <i
                  style={{ fontSize: "8px", color: "green" }}
                  class="fas fa-asterisk"
                ></i>
              </p>
              <input
                value={prevobj[it.NAME]}
                className={classes["input"]}
                type="text"
                name={it.NAME}
                onChange={(e) => onChange(e)}
              />
            </Fragment>
          );
        }
      })}
      {err}
      <button
        className={classes["submit"]}
        onClick={(e) => create(e)}
        style={{ cursor: "pointer" }}
      >
        Update company table <i class="fas fa-pen"></i>
      </button>
    </div>
  );
};
EditCompany.propType = {
  getgroups: PropTypes.func.isRequired,
  getfields: PropTypes.func.isRequired,
  getmodules: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
  module: PropTypes.object.isRequired,
  getallcompanies: PropTypes.func.isRequired,
  allcomp: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  groups: state.Group,
  modules: state.Module,
  fields: state.Field,
  allcomp: state.All_Companies.companies,
});
export default connect(mapStatetoProps, {
  getgroups,
  getmodules,
  getfields,
  getallcompanies,
})(EditCompany);
