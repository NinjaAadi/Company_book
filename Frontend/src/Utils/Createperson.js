import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const createperson = async (obj) => {
  try {
    if (obj["NAME"].length == 0) {
      return false;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    //Endpoint
    const endpoint = host + "/api/v1/person/createperson";
    const data = {
      email,
      password,
      ...obj,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default createperson;
