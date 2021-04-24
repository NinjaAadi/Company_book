import axios from "axios";
import host from "../host";
import { encryptData ,decryptData} from "../Utils/EncryptDecrypt";
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
    // console.log(res);
    const salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac120003";
    const encryptedPassword = encryptData(res.data.password, salt);

    localStorage.setItem("PASSWORD", encryptedPassword);
    localStorage.setItem("EMAIL",res.data.email);
    console.log(res);
    console.log(encryptedPassword);


    

    let  localData = localStorage.getItem("PASSWORD");
    // console.log(mkLocalData);
    // if (!mkLocalData) {
    //   // Handle, if there is no data in localStorage, or if someone deleted the localStorage.
    // }
    
    //  salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac120003";
    const decryptedData = decryptData(localData, salt);
    // const decryptedData=decryptData(encryptedData,salt);
    console.log(decryptedData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default LoginUser;
