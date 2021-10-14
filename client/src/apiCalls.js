// import axios from "axios";
// import axios from "axios";
import API from "./utils/API";
export const loginCall = async (userCredntials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await API.post("/login", userCredntials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const signupCall = async (userCredntials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await API.post("/signup", userCredntials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
