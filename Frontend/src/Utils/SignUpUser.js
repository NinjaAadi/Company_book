import axios from "axios";
import host from "../host";


const SignUpUser = async (name, email, password, adminpass) => {
  try {
    if (
      name.length == 0 ||
      email.length == 0 ||
      password.length < 8 ||
      adminpass.length < 6
    ) {
      return false;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      name,
      email,
      password,
      adminpass,
    };
    const endpoint = host + "/api/v1/users/register";

    const res = await axios.post(endpoint, data, config);

    localStorage.setItem("email", res.data.user.email);
    localStorage.setItem("password", password);

    return true;
  } catch (error) {
    return false;
  }
};

export default SignUpUser;
