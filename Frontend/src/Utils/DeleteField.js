import axios from "axios";
import host from "../host";
import { email, password } from "../auth";
const deletefield = async (name) => {
  name = name.split(" ").join("");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    //Endpoint
    const endpoint = host + "/api/v1/field/deletefield";
    const data = {
      email,
      password,
      field_name: name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default deletefield;
