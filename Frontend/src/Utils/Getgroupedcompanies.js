import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const getgroupedcompanies = async (g_string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Endpoint
    const endpoint = host + "/api/v1/query/groups";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
      g_string,
    };
    const res = await axios.post(endpoint, data, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getgroupedcompanies;
