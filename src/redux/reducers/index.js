import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user";

const mainReducer = combineReducers({
  login: userReducer,
});

export { mainReducer };
