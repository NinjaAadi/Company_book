import axios from "axios";
import host from "../host";
const editcompany = async (comp) => {
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
    const endpoint = host + "/api/v1/company/editcompany";
    const data = {
      email,
      password,
    };
    const c_data = { ...data, ...comp };
    console.log(c_data, config, endpoint);
    const res = await axios.post(endpoint, c_data, config);
    const commp = JSON.stringify(comp);
    localStorage.removeItem("comp");
    localStorage.setItem("comp", commp);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default editcompany;
