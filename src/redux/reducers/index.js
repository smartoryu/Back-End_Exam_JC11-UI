import { combineReducers } from "redux";
import authReducers from "./authReducers";
import categoryReducers from "./categoryReducers";

export default combineReducers({
  auth: authReducers,
  cat: categoryReducers,
});
