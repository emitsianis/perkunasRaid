import { GET_CHARS, CHARS_LOADING } from "../actions/types";

const initialState = {
  chars: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHARS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CHARS:
      return {
        ...state,
        chars: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
