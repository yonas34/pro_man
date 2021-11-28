import isLoggedin from "./isLoggedin";
import user from "./user";
import users from './users'
import material from './material'
import { combineReducers } from "redux";
const allReducers=combineReducers({
    isLoggedin:isLoggedin,
    user:user,
    users:users,
    material:material
});
export default allReducers;
