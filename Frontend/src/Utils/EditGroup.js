import axios from "axios";
import { email, password } from "../auth";
import host from "../host";
const editgroup = async (id, new_name) => {
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
    const endpoint = host + "/api/v1/groups/editgroup";
    const data = {
      email,
      password,
      g_id: id,
      g_name: new_name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default editgroup;
