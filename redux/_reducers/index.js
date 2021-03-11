import { combineReducers } from "redux";
import user from "./user_reducer";
import users from "./users_reducer";

const rootReducer = combineReducers({
  user,
  users,
});

export default rootReducer;
