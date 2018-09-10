import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import charReducer from "./charReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chars: charReducer
});
