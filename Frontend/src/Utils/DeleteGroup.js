import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const deletegroup = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    //Endpoint
    const endpoint = host + "/api/v1/groups/deletegroup";
    const data = {
      email,
      password,
      g_id: id,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default deletegroup;
