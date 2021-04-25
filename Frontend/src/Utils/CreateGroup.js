import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const creategroup = async (name) => {
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
    const endpoint = host + "/api/v1/groups/creategroup";
    const data = {
      email,
      password,
      g_name: name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default creategroup;
