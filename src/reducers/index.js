import isLoggedin from "./isLoggedin";
import user from "./user";
import { combineReducers } from "redux";
const allReducers=combineReducers({
    isLoggedin:isLoggedin,
    user:user
});
export default allReducers;
