import { SET_FIELDS } from "../Actiontype";
const initialstate = {
  c_fields: "",
  isfetched: false,
};

function fieldreducer(state = initialstate, action) {
  const { type, data } = action;
  switch (type) {
    case SET_FIELDS: {
      return {
        c_fields: data,
        isfetched: true,
      };
    }
    default:
      console.log(type);
      return state;
  }
}
export default fieldreducer;
