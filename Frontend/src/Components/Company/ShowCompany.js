import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Showcompany.module.css";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
//Import actions
import getallcompanies from "../../Actions/Company/Getallcompanies";
import getfirstnamecomp from "../../Actions/Company/GetFirstnameComp";
import { getgroups } from "../../Actions/Getgroups";
import { getfields } from "../../Actions/Getfields";
import getallcomp from "../../Actions/Company/GetAllComp";

//Import components to be shown
import Showallcompany from "./ShowAllCompanies/Showallcompany";

const ShowCompany = (props) => {
  const history = useHistory();

  const [color, setcolor] = useState({
    c1: "red",
    c2: "#00af91",
    first: true,
  });
  const [querystr, setstr] = useState("");
  const str = querystr;

  //Show all companies
  const showall = async (e) => {
    await props.getallcompanies();
  };
  //Input field on change
  const onChange = (e) => {
    setstr(e.target.value);
  };
  const toggle = (e) => {
    if (e.target.name === "c1") {
      setcolor({
        c1: "red",
        c2: "#00af91",
        first: true,
      });
    } else {
      setcolor({
        c2: "red",
        c1: "#00af91",
        first: false,
      });
    }
  };
  const authemail = localStorage.getItem("email");
  const authpass = localStorage.getItem("password");

  if (authemail === null || authpass === null) {
    history.push("/");
  }
  //Function to search
  const search = (e) => {
    querystr.trim();
    if (querystr.trim().length === 0) {
      return;
    }
    if (color.first === false) {
      async function query() {
        await props.getallcomp(querystr.trim());
      }
      query();
    } else {
      async function query() {
        await props.getfirstnamecomp(querystr.trim());
      }
      query();
    }
  };

  useEffect(() => {
    async function getallcompp() {
      await props.getallcompanies();
      await props.getfields();
      await props.getgroups();
    }
    getallcompp();
  }, []);

  return (
    <Fragment>
      <div className={classes["body"]}>
        <div className={classes["head"]}>
          <h1 className={classes["h1"]}>Registered Companies</h1>
        </div>
        <div className={classes["search"]}>
          <input
            value={str}
            onChange={(e) => onChange(e)}
            className={classes["input"]}
            type="text"
            placeholder="Enter the company name"
          />
          <button className={classes["search-2"]} onClick={(e) => search(e)}>
            <i className="fas fa-search"></i> Search
          </button>
          <button
            name="c1"
            onClick={(e) => toggle(e)}
            style={{ backgroundColor: color.c1, border: color.c1 }}
            className={classes["occ"]}
          >
            FO
          </button>
          <button
            onClick={(e) => toggle(e)}
            name="c2"
            style={{ backgroundColor: color.c2, border: color.c2 }}
            className={classes["occ"]}
          >
            AO
          </button>
          <button className={classes["search-3"]} onClick={(e) => showall(e)}>
            Show All Companies
          </button>
          <button
            className={classes["search-3"]}
            style={{ marginTop: "20px", marginLeft: "0px" }}
            onClick={(e) => history.push("/groupsearch")}
          >
            <i className="fas fa-search"></i> Search based in groups
          </button>
        </div>
        <Showallcompany />
      </div>
    </Fragment>
  );
};
ShowCompany.propType = {
  getallcompanies: PropTypes.func.isRequired,
  getfirstnamecomp: PropTypes.func.isRequired,
  getallcomp: PropTypes.func.isRequired,
  getgroups: PropTypes.func.isRequired,
  getfields: PropTypes.func.isRequired,
};
export default connect(null, {
  getallcompanies,
  getfirstnamecomp,
  getallcomp,
  getgroups,
  getfields,
})(ShowCompany);
