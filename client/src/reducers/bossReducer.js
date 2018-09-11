import { GET_BOSSES, BOSSES_LOADING } from "../actions/types";

const initialState = {
  bosses: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOSSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BOSSES:
      return {
        ...state,
        bosses: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
