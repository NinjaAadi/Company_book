import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const getperson = async (C_ID) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Endpoint
    const endpoint = host + "/api/v1/person/getallperson";
    const data = {
      email,
      password,
      C_ID,
    };
    const res = await axios.post(endpoint, data, config);
    return res.data.rows;
  } catch (error) {
    return [];
    console.log(error);
  }
};

export default getperson;
