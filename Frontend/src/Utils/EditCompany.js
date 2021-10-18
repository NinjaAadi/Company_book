import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const editcompany = async (comp) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Endpoint
    const endpoint = host + "/api/v1/company/newedit";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
    };
    const c_data = { ...data, ...comp };
    console.log(c_data, config, endpoint);
    const res = await axios.post(endpoint, c_data, config);
    console.log(res);
    const commp = JSON.stringify(comp);
    localStorage.removeItem("comp");
    localStorage.setItem("comp", commp);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default editcompany;
