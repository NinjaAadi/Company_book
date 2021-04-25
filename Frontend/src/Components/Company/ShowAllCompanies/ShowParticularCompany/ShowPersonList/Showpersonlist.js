import React, { useEffect, useState, Fragment } from "react";
import classes from "./Showpersonlist.module.css";

//Import fetch function from utils
import getallperson from "../../../../../Utils/Getallperson";
import deleteperson from "../../../../../Utils/Deleteperson";
import DeletePopup from "../../../../DeletePop/DeletePopup";

//Import edit popup
import Personedit from "./Personedit/Personedit";
import { useHistory } from "react-router";
const Showpersonlist = () => {
  let comp = JSON.parse(localStorage.getItem("comp"));
  const [person, setperson] = useState([]);
  const [toggler, settoggler] = useState(false);
  const [toggler2, settoggler2] = useState(false);
  const history = useHistory();
  const authemail = localStorage.getItem("email");
  const authpass = localStorage.getItem("password");
  if (authemail === null || authpass === null) {
    history.push("/");
  }
  useEffect(() => {
    async function getperson() {
      const persons = await getallperson(comp["C_ID"]);
      setperson(persons);
    }
    getperson();
  }, [toggler, toggler2]);
  /*------------------------Toggler 1--------------------- */

  const [id, setid] = useState();
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
    console.log(id);
    setid(id);
    toggle();
  };
  /*------------------------Toggler 1--------------------- */

  const [obj, setobj] = useState();
  const toggle2 = () => {
    if (toggler2 == false) {
      settoggler2(true);
    } else {
      settoggler2(false);
    }
  };
  const close2 = () => {
    settoggler2(false);
  };
  const setobjedit = (e, obj) => {
    setobj(obj);
    toggle2();
  };
  const p_fields = person;
  return (
    <div className={classes["body"]}>
      {toggler == true ? (
        <DeletePopup p_value={id} toggler={close} mainfunc={deleteperson} />
      ) : (
        <Fragment></Fragment>
      )}
      {toggler2 == true ? (
        <Personedit person={obj} toggler={close2} />
      ) : (
        <Fragment></Fragment>
      )}
      <h1 className={classes["h1"]}>People registered in {comp["C_NAME"]}</h1>
      <br />
      <hr />
      <br />
      <table className={classes["table"]}>
        <tr>
          <th className={classes["th"]}>P_ID</th>
          <th className={classes["th"]}>P_NAME</th>
          <th className={classes["th"]}>P_DESIGNATION</th>
          <th className={classes["th"]}>P_PHONE</th>
          <th className={classes["th"]}>P_EMAIL</th>
          <th className={classes["th"]}></th>
          <th className={classes["th"]}></th>
        </tr>
        {p_fields.map((item) => {
          return (
            <tr className={classes["tr"]}>
              <td className={classes["td"]}>{item["ID"]}</td>
              <td className={classes["td"]}>{item["NAME"]}</td>
              <td className={classes["td"]}>{item["DESIGNATION"]}</td>
              <td className={classes["td"]}>{item["MOBILE"]}</td>
              <td className={classes["td"]}>{item["EMAIL"]}</td>
              <td className={classes["td"]}>
                <i
                  onClick={(e) => setobjedit(e, item)}
                  style={{ color: "green" }}
                  class="fas fa-pen"
                ></i>
              </td>
              <td className={classes["td"]}>
                <i
                  onClick={(e) => setidtodelete(e, item["ID"])}
                  style={{ color: "red" }}
                  class="fas fa-trash-alt"
                ></i>
              </td>
            </tr>
          );
        })}
      </table>
      <hr />
    </div>
  );
};

export default Showpersonlist;
