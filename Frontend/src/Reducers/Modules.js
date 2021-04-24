import { SET_MODULES } from "../Actiontype";
const initialstate = {
  c_modules: "",
  isfetched: false,
};

function modulereducer(state = initialstate, action) {
  const { type, data } = action;
  switch (type) {
    case SET_MODULES: {
      return {
        c_modules: data,
        isfetched: true,
      };
    }
    default:
      return state;
  }
}
export default modulereducer;
