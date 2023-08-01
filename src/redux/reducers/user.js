import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUESTED,
  USER_LOGIN_SUCCESSFUL,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUESTED,
  USER_REGISTER_SUCCESSFUL,
} from "../actions/user";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  isLoading: false,
  token: "",
};

const userReducer = (userState = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUESTED:
      return {
        ...userState,
        isLoading: true,
      };
    case USER_LOGIN_SUCCESSFUL:
      return {
        ...userState,
        isLoading: false,
        ...action.userToken,
      };
    case USER_LOGIN_FAILED:
      return {
        ...userState,
      };
    case USER_REGISTER_REQUESTED:
      return {
        ...userState,
      };
    case USER_REGISTER_SUCCESSFUL:
      return {
        ...userState,
      };
    case USER_REGISTER_FAILED:
      return {
        ...userState,
      };
    default:
      return userState;
  }
};

export { userReducer };
