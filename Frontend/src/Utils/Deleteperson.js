import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const deleteperson = async (p_id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Endpoint
    const endpoint = host + "/api/v1/person/deleteperson";
    const data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
      p_id,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default deleteperson;
