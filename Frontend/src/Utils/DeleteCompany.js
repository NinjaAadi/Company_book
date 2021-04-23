import axios from "axios";
import host from "../host";
const deletecompany = async (id) => {
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
    const endpoint = host + "/api/v1/company/deletecompany";
    const data = {
      email,
      password,
      c_id: id,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default deletecompany;
