import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const createcompany = async (comp) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //To be fethched from localstorage
    //Endpoint
    const endpoint = host + "/api/v1/company/createcompany";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
    };
    const c_data = { ...data, ...comp };
    console.log(c_data, config, endpoint);
    const res = await axios.post(endpoint, c_data, config);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default createcompany;
