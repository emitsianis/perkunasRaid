import axios from "axios";

import { GET_CHARS, CHARS_LOADING, CLEAR_ERRORS } from "./types";

// Get aq chars if group=aq or oc chars if group=oc
export const getChars = group => dispatch => {
  dispatch(setCharsLoading());
  axios
    .get(`/api/chars/${group}`)
    .then(res =>
      dispatch({
        type: GET_CHARS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHARS,
        payload: null
      })
    );
};

//Set loading state
export const setCharsLoading = () => {
  return {
    type: CHARS_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
