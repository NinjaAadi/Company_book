import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
//import actions
import { SET_FIELDS } from "../Actiontype";

//Function to fetch all the fields from the server
export const getfields = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = {
    email: email || localStorage.getItem("email"),
    password: password || localStorage.getItem("password"),
  };
  //Endpoint
  const endpoint = host + "/api/v1/field/getallfields";

  const fields = await axios.post(endpoint, data, config);
  console.log(fields);
  localStorage.removeItem("allfields");
  localStorage.setItem("allfields", JSON.stringify(fields.data.rows));
  //Dispatch the data into the store
  dispatch({
    type: SET_FIELDS,
    data: fields.data.rows,
  });
};
