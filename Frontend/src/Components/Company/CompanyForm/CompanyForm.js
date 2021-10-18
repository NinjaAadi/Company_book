import React, { useState, useEffect, Fragment, useMemo } from "react";
import classes from "./Companyform.module.css";
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
import createcompany from "../../../Utils/CreateCompany";
import { useHistory } from "react-router";
const CompanyForm = (props) => {
  //state for error message
  const [err, seterr] = useState("");
  //For country codes
  const [country, setcountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changecountry = (value) => {
    setcountry(value);
  };
  const history = useHistory();
  const authemail = localStorage.getItem("email");
  const authpass = localStorage.getItem("password");
  if (authemail === null || authpass === null) {
    history.push("/");
  }
  const [date, setdate] = useState();

  useEffect(() => {
    async function fetchall() {
      await props.getgroups();
      await props.getmodules();
      await props.getfields();
      await props.getallcompanies();
    }
    fetchall();
    const dd = Date.now();
    const currd = new Date(dd);
    setdate(currd);
  }, [err]);

  //For groups
  const [value, setvalue] = useState();

  const handleOnchange = (val) => {
    setvalue(val);
  };

  //For modules
  const [value2, setvalue2] = useState();

  const handleOnchange2 = (val) => {
    setvalue2(val);
  };
  if (
    props.groups.isfetched === false ||
    props.modules.isfetched === false ||
    props.fields.isfetched === false
  ) {
    return <Spinner />;
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
    res[e.target.name] = e.target.value;
  };

  const setdatemy = (date) => {
    setdate(date);
  };

  //on form submission
  const create = async (e) => {
    res["C_CREATED_AT"] = date.toString();
    console.log(date, res["C_CREATED_AT"]);

    res["C_COUNTRY"] = JSON.stringify(country);

    if (value != undefined || value != null) {
      res["C_G_ID"] = value.split(",");
    } else {
      res["C_G_ID"] = [];
    }
    if (value2 != undefined || value2 != null) {
      res["C_M_ID"] = value2.split(",");
    } else {
      res["C_M_ID"] = [];
    }

    var flag = 0;
    props.allcomp.map((c) => {
      if (res["C_NAME"] == c.C_NAME) {
        flag = 1;
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
    const rres = await createcompany(res);
    if (rres == false) {
      seterr(
        <p style={{ color: "red" }}>
          Cannot set/modify company.Either there exists a company with this name
          or there is
          <br /> some error!
        </p>
      );
    } else {
      seterr(
        <p style={{ color: "green" }}>Company registered successfully!</p>
      );
    }
    setTimeout(() => {
      seterr("");
    }, 2000);
  };

  //Create the group array for dropdown
  const g_options = [];
  const m_options = [];

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
        Register your company{" "}
        <i style={{ color: "#f58634" }} class="fas fa-building"></i>
      </h1>
      <br />
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
      <select
        className={classes["sel"]}
        id="cars"
        name="C_ACTIVE"
        onChange={(e) => onChange(e)}
      >
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
          it.NAME != "C_NOTES" &&
          it.NAME !== "C_CREATED_AT" &&
          it.NAME !== "C_COUNTRY"
        ) {
          return (
            <Fragment>
              <p className={classes["p"]}>
                {it.NAME}
                {"  "}
                <i
                  style={{ fontSize: "8px", color: "red" }}
                  class="fas fa-asterisk"
                ></i>
              </p>
              <input
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
        className={classes["input-1"]}
        type="text"
        name="C_NOTES"
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
      <button className={classes["submit"]} onClick={(e) => create(e)}>
        Create company table <i class="fas fa-pen"></i>
      </button>
    </div>
  );
};
CompanyForm.propType = {
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
})(CompanyForm);
