import axios from "axios";
import host from "../host";

const getgroupedcompanies = async (g_string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //To be fethched from localstorage
    const email = "aaditya@gmail.com";
    const password = "123456";
    //Endpoint
    const endpoint = host + "/api/v1/query/groups";
    const data = {
      email,
      password,
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
