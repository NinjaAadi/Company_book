import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const deletemodule = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Endpoint
    const endpoint = host + "/api/v1/module/deletemodule";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
      m_id: id,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default deletemodule;
