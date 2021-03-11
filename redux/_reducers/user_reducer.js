import {
  USER_DATA_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from "../type/type";

const initialState = {
  users: null,
  posts: [],
  following: [],
};

export default function (state = initialState, action) {
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
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
}
