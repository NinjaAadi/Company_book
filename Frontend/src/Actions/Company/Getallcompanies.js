import axios from "axios";
import host from "../../host";
import { GET_ALL_COMPANIES, CLEAR_COMP } from "../../Actiontype";
import { email, password } from "../../auth";
//Function to fetch all the companies
const getallcompanies = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_COMP,
      data: [],
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //To be fetched from the localstorage

    const endpoint = host + "/api/v1/company/getallcompanies";
    const data = {
      email,
      password,
    };
    const res = await axios.post(endpoint, data, config);
    localStorage.removeItem("allcompany");
    localStorage.setItem("allcompany", JSON.stringify(res.data.c_data));
    dispatch({
      type: GET_ALL_COMPANIES,
      data: res.data.c_data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getallcompanies;
