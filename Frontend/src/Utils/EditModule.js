import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const editmodule = async (id, new_name) => {
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
    const endpoint = host + "/api/v1/module/editmodule";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
      m_id: id,
      m_name: new_name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default editmodule;
