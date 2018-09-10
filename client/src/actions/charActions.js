import axios from "axios";

import { GET_CHARS, CHARS_LOADING, GET_ERRORS, CLEAR_ERRORS } from "./types";

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

export const addChar = (group, char, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/chars/${group}/create`, char)
    .then(res => {
      if (group === "aq") {
        history.push("/");
      } else {
        history.push("/oc");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteChar = (group, id, history) => dispatch => {
  axios
    .delete(`/api/chars/${group}/${id}`)
    .then(res => {
      if (group === "aq") {
        history.push("/");
      } else {
        history.push("/oc");
      }
    })
    .catch(err => {
      console.log(err);
    });
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
