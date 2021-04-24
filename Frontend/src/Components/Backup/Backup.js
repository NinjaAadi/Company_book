import React, { useState } from "react";
import classes from "./Backup.module.css";
import dbpass from "../../dbpass";
import host from "../../host";
import axios from "axios";
const Backup = () => {
  const [pass, setpass] = useState();
  const [msg, setmsg] = useState();
  const onsubmit = async (e) => {
    try {
      const endpoint = host + "/api/v1/backup";
      const data = { password: pass };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (pass === undefined || pass.length == 0 || pass != dbpass) {
        setmsg(<p style={{ color: "red" }}>Error in creating backup</p>);
        setTimeout(() => {
          setmsg("");
        }, 2000);
        return;
      }
      const res = await axios.post(endpoint, data, config);
      setmsg(<p style={{ color: "green" }}>Backup successfull</p>);
      setTimeout(() => {
        setmsg("");
      }, 2000);
      return;
    } catch (error) {
      setmsg(<p style={{ color: "red" }}>Error in creating backup</p>);
      setTimeout(() => {
        setmsg("");
      }, 2000);
      return;
    }
  };
 const onsubmit2 = async (e) => {
   try {
     const endpoint = host + "/api/v1/restore";
     const data = { password: pass };
     const config = {
       headers: {
         "Content-Type": "application/json",
       },
     };
     if (pass === undefined || pass.length == 0 || pass != dbpass) {
       setmsg(<p style={{ color: "red" }}>Error in restoration!</p>);
       setTimeout(() => {
         setmsg("");
       }, 2000);
       return;
     }
     const res = await axios.post(endpoint, data, config);
     console.log(res);
     setmsg(<p style={{ color: "green" }}>Restore successfull</p>);
     setTimeout(() => {
       setmsg("");
     }, 2000);
     return;
   } catch (error) {
     setmsg(<p style={{ color: "red" }}>Error in restoration!</p>);
     setTimeout(() => {
       setmsg("");
     }, 2000);
     return;
   }
 };
  return (
    <div className={classes["body"]}>
      <div className={classes["head"]}>
        <h1>
          Backup and Restore your data{" "}
          <i style={{ color: "#f58634" }} class="fas fa-window-restore"></i>
        </h1>

        <br />
        <hr />
        <br />
        <br />
        <div className={classes["head"]}>{msg}</div>

        <div className={classes["head"]}>
          <input
            className={classes["input"]}
            type="text"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
        </div>
        <div className={classes["head-1"]}>
          <button
            className={classes["btn"]}
            onClick={(e) => {
              onsubmit(e);
            }}
          >
            Backup your data
          </button>
          <button
            className={classes["btn"]}
            onClick={(e) => {
              onsubmit2(e);
            }}
          >
            Restore your data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Backup;
