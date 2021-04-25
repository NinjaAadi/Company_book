import axios from "axios";
import host from "../../host";
import { email, password } from "../../auth";
import { SEARCH_ALL_COMP, GET_ALL_COMPANIES,CLEAR_COMP } from "../../Actiontype";

//Function to fetch all the companies
const getallcomp = (search_name) => async (dispatch) => {
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
    let endpoint = host + "/api/v1/company/getallcompanies";
    let data = {
      email,
      password,
    };
    const res = await axios.post(endpoint, data, config);
    const companies = res.data.c_data;
    endpoint = host + "/api/v1/query/getcompanybasedonname";
    data = {
      email,
      password,
      q_string: search_name,
    };
    let q_array = await axios.post(endpoint, data, config);
    q_array = q_array.data.c_id;
    const comp_all = [];
    for (var i = 0; i < companies.length; i++) {
      for (var j = 0; j < q_array.length; j++) {
        if (q_array[j].C_ID === companies[i].C_ID) {
          comp_all.push(companies[i]);
        }
      }
    }
    dispatch({
      type: SEARCH_ALL_COMP,
      data: comp_all,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getallcomp;
