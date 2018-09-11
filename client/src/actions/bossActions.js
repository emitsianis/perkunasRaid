import axios from "axios";

import { CLEAR_ERRORS, GET_BOSSES, BOSSES_LOADING, GET_ERRORS } from "./types";

export const getBosses = () => dispatch => {
  dispatch(setBossesLoading());
  axios
    .get("/api/bosses")
    .then(res =>
      dispatch({
        type: GET_BOSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOSSES,
        payload: null
      })
    );
};

// add boss ToD
export const editBoss = (bossName, tod, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/bosses/edit/${bossName}`, { tod })
    .then(res => {
      history.push("/bosses");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Set loading state
export const setBossesLoading = () => {
  return {
    type: BOSSES_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
