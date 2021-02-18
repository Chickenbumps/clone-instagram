import { USER_DATA_CHANGE, USER_POSTS_STATE_CHANGE } from "../type/type";

export default function (state = {}, action) {
  switch (action.type) {
    case USER_DATA_CHANGE:
      return {
        ...state,
        users: action.payload,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
