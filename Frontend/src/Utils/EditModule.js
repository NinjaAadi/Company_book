import axios from "axios";
import host from "../host";
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

    //To be fethched from localstorage
    const email = "aaditya@gmail.com";
    const password = "123456";
    //Endpoint
    const endpoint = host + "/api/v1/module/editmodule";
    const data = {
      email,
      password,
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
