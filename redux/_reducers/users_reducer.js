import {
  USERS_DATA_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USERS_FOLLOWING_STATE_CHANGE,
} from "../type/type";
const initialState = {
  users: [],
  feed: [],
  usersFollowingLoaded: 0,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USERS_DATA_CHANGE:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        feed: [...state.feed, action.payload],
      };
    case USERS_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.payload,
      };

    default:
      return state;
  }
}
