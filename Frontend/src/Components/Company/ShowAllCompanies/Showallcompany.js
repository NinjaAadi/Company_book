import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./Company.module.css";
import { Redirect } from "react-router";
import { withRouter, Link } from "react-router-dom";
const Showallcompany = (props) => {
  if (props.company.isfetched === false) {
    return <div>Not Fetched</div>;
  }
  return (
    <Fragment>
      <hr />
      <br />
      <table className={classes["table"]}>
        <tr>
          <th className={classes["th"]}>C_ID</th>
          <th className={classes["th"]}>
            <b>C_NAME</b>
          </th>
          <th className={classes["th"]}></th>
          <th className={classes["th"]}> </th>
        </tr>
        {props.company.querycompanies.map((c) => {
          return (
            <tr>
              <td className={classes["td"]}>{c.C_ID}</td>
              <td className={classes["td"]}>{c.C_NAME}</td>
              <td className={classes["td"]}>
                <Link
                  to={{
                    pathname: "/particularcompany",
                    company: c,
                  }}
                >
                  <i
                    style={{ color: "green", cursor: "pointer" }}
                    class="fas fa-eye"
                  ></i>
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </Fragment>
  );
};
Showallcompany.propTypes = {
  company: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  company: state.All_Companies,
});
export default withRouter(connect(mapStatetoProps, {})(Showallcompany));
