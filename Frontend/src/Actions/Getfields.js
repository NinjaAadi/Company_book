import axios from "axios";
import host from "../host";

//import actions
import { SET_FIELDS } from "../Actiontype";

//Function to fetch all the fields from the server
export const getfields = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //To be fetched from localstorage
  const email = "aaditya@gmail.com";
  const password = "123456";
  const data = {
    email: email,
    password: password,
  };
  //Endpoint
  const endpoint = host + "/api/v1/field/getallfields";

  const fields = await axios.post(endpoint, data, config);
  localStorage.removeItem("allfields");
  localStorage.setItem("allfields",JSON.stringify(fields.data.rows));
  //Dispatch the data into the store
  dispatch({
    type: SET_FIELDS,
    data: fields.data.rows,
  });
};
