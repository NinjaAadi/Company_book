import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./Company.module.css";
import { Redirect, useHistory } from "react-router";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
const Showallcompany = (props) => {
  const history = useHistory();
  if (props.company.isfetched === false||props.fields.isfetched === false) {
    return <Spinner />;
  }

  const authemail = localStorage.getItem("email");
  const authpass = localStorage.getItem("password");

  if (authemail === null || authpass === null) {
    history.push("/");
  }
  const fields = JSON.parse(localStorage.getItem("allfields"))||[];
  return (
    <Fragment>
      <hr />
      <br />
      <div className={classes["resp"]}>
        <table className={classes["table"]}>
          <tr>
            {fields.map((f) => {
              return <th className={classes["th"]}>{f.NAME}</th>;
            })}
            <th className={classes["th"]}>Edit</th>
          </tr>
          {props.company.querycompanies.map((c) => {
            return (
              <tr>
                {fields.map((f) => {
                  if (f.NAME === "C_COUNTRY") {
                    const datee = JSON.parse(c[f.NAME]);
                    const output = datee["label"];
                    return (
                      <td style={{ width: "auto", padding: "10px" }}>
                        {output}
                      </td>
                    );
                  }
                  return (
                    <td style={{ width: "auto", padding: "10px" }}>
                      {c[f.NAME]}
                    </td>
                  );
                })}
                <Link
                  to={{
                    pathname: "/particularcompany",
                    company: c,
                  }}
                >
                  <i
                    style={{
                      color: "green",
                      cursor: "pointer",
                      marginTop: "60%",
                    }}
                    class="fas fa-eye"
                  ></i>
                </Link>
              </tr>
            );
          })}
        </table>
      </div>
    </Fragment>
  );
};
Showallcompany.propTypes = {
  company: PropTypes.object.isRequired,
  fields:PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
  company: state.All_Companies,
  fields:state.Field
});
export default withRouter(connect(mapStatetoProps, {})(Showallcompany));
