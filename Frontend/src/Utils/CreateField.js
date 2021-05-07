import axios from "axios";
import { email, password } from "../auth";
import host from "../host";
const createfield = async (name) => {
  name = name.split(" ").join("");
  try {
    if (name.length == 0) {
      return false;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    //Endpoint
    const endpoint = host + "/api/v1/field/createfield";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
      field_name: name,
      field_original: 0,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default createfield;
