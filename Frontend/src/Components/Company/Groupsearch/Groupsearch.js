import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./Groupsearch.module.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

import getgroupedcompanies from "../../../Utils/Getgroupedcompanies";

const Groupsearch = (props) => {
  const [msg, setmsg] = useState("");
  const [fields, setfields] = useState({});
  const [groups, setgroups] = useState({});
  const [options, setoption] = useState({});
  const [showfield, setshowfield] = useState([]);
  const [val, setval] = useState();
  const [companies, setcompanies] = useState([]);
  useEffect(() => {
    const fields = JSON.parse(localStorage.getItem("allfields"));
    const obj = {};
    fields.map((f) => {
      obj[f.NAME] = false;
    });
    setfields(obj);
    const groups = JSON.parse(localStorage.getItem("allgroups"));
    const options = [];
    groups.map((g) => {
      options.push({
        label: g.G_NAME,
        value: g.G_ID,
      });
    });
    setoption(options);
  }, []);

  //Function to select in checkbox
  const select = (e) => {
    const res = fields[e.target.name];
    let ans;
    if (res) {
      ans = false;
    } else {
      ans = true;
    }
    setfields({ ...fields, [e.target.name]: ans });
  };

  //Function to submit
  const onsubmit = async (e) => {
    const ff = JSON.parse(localStorage.getItem("allfields"));
    const arr = [];
    let flag = false;
    ff.map((f) => {
      const name = f.NAME;
      if (fields[name]) {
        flag = true;
        arr.push(name);
      }
    });
    setshowfield(arr);
    if (flag === false || val == undefined || val.length === 0) {
      setmsg(
        <p style={{ color: "red" }}>
          Please select atleast one group/one field!
        </p>
      );
      setTimeout(() => {
        setmsg("");
      }, 2000);
      return;
    }
    let ress = await getgroupedcompanies(val);
    ress = ress.C_ID;
    const allcompanies = JSON.parse(localStorage.getItem("allcompany"));
    const showcomp = [];
    ress.map((cid) => {
      console.log(cid);
      allcompanies.map((c) => {
        if (cid == c.C_ID) {
          showcomp.push(c);
        }
      });
    });
    console.log(showcomp);
    setcompanies(showcomp);
  };

  //Set group query
  const setgroupquery = (val) => {
    setval(val);
  };
  return (
    <Fragment>
      <div className={classes["body"]}>
        <div className={classes["head"]}>
          <h1 style={{ color: "grey" }}>Search/Import based on groups</h1>
        </div>
        <br />
        <hr />
        <br />
        <div className={classes["head"]}>
          <h3>Select Groups</h3>
        </div>
        <MultiSelect
          placeholder="Select groups"
          options={options}
          onChange={(val) => {
            setgroupquery(val);
          }}
          style={{ width: "80%", margin: "auto" }}
          option={options}
        />
        <br />
        <div className={classes["head"]}>
          <h3>Select Fields</h3>
        </div>
        <div className={classes["flex"]}>
          {JSON.parse(localStorage.getItem("allfields")).map((f) => {
            return (
              <div className={classes["item"]}>
                <label className={classes["label"]}>{f.NAME}</label>
                <input
                  type="checkbox"
                  name={f.NAME}
                  onChange={(e) => select(e)}
                />
              </div>
            );
          })}
        </div>

        <div className={classes["head"]}>
          {msg}
          <button className={classes["btn"]} onClick={(e) => onsubmit(e)}>
            Search <i class="fas fa-search"></i>
          </button>
        </div>

        <div className={classes["head-1"]}>
          <h2 className={classes["center"]}>Search Results</h2>
          <table className={classes["table"]}>
            <tr className={classes["tr-1"]}>
              {showfield.map((item) => {
                return <th className={classes["th"]}>{item}</th>;
              })}
            </tr>
            {companies.map((c) => {
              return (
                <tr>
                  {showfield.map((fname) => {
                    if (fname == "C_COUNTRY") {
                      const ans = JSON.parse(c[fname]);
                      const ret = ans["label"];
                      return <td className={classes["td"]}>{ret}</td>;
                    } else if (c[fname] === null) {
                      return <td className={classes["td"]}>null</td>;
                    }
                    return <td className={classes["td"]}>{c[fname]}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        </div>
        <br />
        <br />
      </div>
    </Fragment>
  );
};

Groupsearch.propTypes = {
  fields: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
  getfields: PropTypes.func.isRequired,
  getgroups: PropTypes.func.isRequired,
  getallcompanies: PropTypes.func.isRequired,
};

export default Groupsearch;
