import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
import { decryptData } from "../Utils/EncryptDecrypt";
//import actions
import { SET_GROUPS } from "../Actiontype";

//Function to fetch all the fields from the server
export const getgroups = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //To be fetched from localstorage
  const data = {
    email: email,
    password: password,
  };
  //Endpoint
  const endpoint = host + "/api/v1/groups/getallgroups";

  const groups = await axios.post(endpoint, data, config);
  localStorage.removeItem("allgroups");
  localStorage.setItem("allgroups", JSON.stringify(groups.data.rows));
  //Dispatch the data into the store
  dispatch({
    type: SET_GROUPS,
    data: groups.data.rows,
  });
};
