import axios from "axios";
import host from "../host";
import { encryptData } from "../Utils/EncryptDecrypt";

const SignUpUser = async (name,email,password,adminpass) => {
  try {
      if(name.length==0 || email.length==0 || password.length<8 || adminpass.length<6)
        return false;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      name,
      email,
      password,
      adminpass
    };
    const endpoint = host + "/api/v1/users/register";
    
    const res = await axios.post(endpoint, data, config);
    console.log(res);
    const salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac120003";
    const encryptedSignupPassword = encryptData(res.data.user.password, salt);

      localStorage.setItem("signUp Email",res.data.user.email);
     localStorage.setItem("SignUp password", encryptedSignupPassword);
   
    console.log(res);
    return true;
  } catch (error) {
      return false;
  }
};

export default SignUpUser;
