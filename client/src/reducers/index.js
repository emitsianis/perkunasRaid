import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import charReducer from "./charReducer";
import bossReducer from "./bossReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chars: charReducer,
  bosses: bossReducer
});
