import { SET_GROUPS } from "../Actiontype";
const initialstate = {
  c_groups: "",
  isfetched: false,
};

function groupreducer(state = initialstate, action) {
  const { type, data } = action;
  switch (type) {
    case SET_GROUPS: {
      return {
        c_groups: data,
        isfetched: true,
      };
    }
    default:
      return state;
  }
}
export default groupreducer;
