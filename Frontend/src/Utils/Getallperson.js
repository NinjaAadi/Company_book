import axios from "axios";
import host from "../host";

const getperson = async (C_ID) => {
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
