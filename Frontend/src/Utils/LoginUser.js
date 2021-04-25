import axios from "axios";
import host from "../host";
import { encrypt, decrypt } from "../Utils/EncryptDecrypt";
const LoginUser = async (email, password) => {
  try {
    if (email.length == 0 || password.length == 0) {
      return false;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      email,
      password,
    };

    const endpoint = host + "/api/v1/users/login";
    const res = await axios.post(endpoint, data, config);

    localStorage.setItem("password", password);
    localStorage.setItem("email", email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default LoginUser;
