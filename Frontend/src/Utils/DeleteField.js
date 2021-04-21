import axios from "axios";
import host from "../host";
const deletefield = async (name) => {
  name = name.split(" ").join("");
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
