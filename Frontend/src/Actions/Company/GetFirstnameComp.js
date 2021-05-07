import axios from "axios";
import host from "../../host";
import {
  SEARCH_FIRST_COMP,
  GET_ALL_COMPANIES,
  CLEAR_COMP,
} from "../../Actiontype";
import { email, password } from "../../auth";
//Function to fetch all the companies
const getfirstnamecomp = (search_name) => async (dispatch) => {
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
    let endpoint = host + "/api/v1/company/getallcompanies";
    let data = {
      email,
      password,
    };
    const res = await axios.post(endpoint, data, config);
    const companies = res.data.c_data;
    endpoint = host + "/api/v1/query/getcompanybasedonfirstname";
    data = {
      email: email || localStorage.getItem("email"),
      password: password || localStorage.getItem("password"),
      q_string: search_name,
    };
    const comp_first = [];
    let q_array = await axios.post(endpoint, data, config);
    q_array = q_array.data.c_id;
    for (var i = 0; i < companies.length; i++) {
      for (var j = 0; j < q_array.length; j++) {
        if (q_array[j].C_ID === companies[i].C_ID) {
          comp_first.push(companies[i]);
        }
      }
    }
    dispatch({
      type: SEARCH_FIRST_COMP,
      data: comp_first,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getfirstnamecomp;
