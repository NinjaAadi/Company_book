import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
//import actions
import { SET_MODULES } from "../Actiontype";

//Function to fetch all the fields from the server
export const getmodules = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = {
    email: email,
    password: password,
  };
  //Endpoint
  const endpoint = host + "/api/v1/module/getallmodules";

  const modules = await axios.post(endpoint, data, config);

  //Dispatch the data into the store
  dispatch({
    type: SET_MODULES,
    data: modules.data.rows,
  });
};
