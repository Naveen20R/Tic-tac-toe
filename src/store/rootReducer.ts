import { combineReducers } from "@reduxjs/toolkit";
import { commonReducers } from "./common";

export const rootReducer = combineReducers({
  ...commonReducers,
});
