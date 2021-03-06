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

export const getEpicBosses = () => dispatch => {
  dispatch(setBossesLoading());
  axios
    .get("/api/bosses/epic")
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
export const editBoss = (data, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/bosses/edit/${data.name}`, data)
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

export const editEpicBoss = (data, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/bosses/epic/edit", data)
    .then(res => {
      history.push("/epicbosses");
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
