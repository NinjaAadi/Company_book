import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const editfield = async (old_name, new_name) => {
  new_name = new_name.split(" ").join("");
  try {
    if (new_name.length === 0) {
      return false;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

 
    //Endpoint
    const endpoint = host + "/api/v1/field/editfield";
    const data = {
      email,
      password,
      old_name,
      new_name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default editfield;
