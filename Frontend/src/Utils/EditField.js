import axios from "axios";
import host from "../host";
const editfield = async (old_name, new_name) => {
  new_name = new_name.split(" ").join("");
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
    const endpoint = host + "/api/v1/field/editfield";
    const data = {
      email,
      password,
      old_name,
      new_name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default editfield;
