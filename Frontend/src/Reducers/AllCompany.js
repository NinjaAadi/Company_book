import {
  GET_ALL_COMPANIES,
  SEARCH_FIRST_COMP,
  SEARCH_ALL_COMP,
  CLEAR_COMP,
} from "../Actiontype";
const initialstate = {
  companies: "",
  querycompanies: [],
  isfetched: false,
};

function companyreducer(state = initialstate, action) {
  const { type, data } = action;
  switch (type) {
    case GET_ALL_COMPANIES: {
      const all = [];
      data.map((c) => {
        return all.push(c);
      });
      return {
        companies: data,
        querycompanies: all,
        isfetched: true,
      };
    }
    case SEARCH_FIRST_COMP: {
      return {
        ...state,
        querycompanies: data,
      };
    }
    case SEARCH_ALL_COMP: {
      return {
        ...state,
        querycompanies: data,
      };
    }
    case CLEAR_COMP: {
      return {
        ...state,
        querycompanies: [],
      };
    }
    default:
      return state;
  }
}
export default companyreducer;
