import { call, put, takeEvery } from "redux-saga/effects";
import { userLoginRequest } from "../../api/user";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUESTED,
  USER_LOGIN_SUCCESSFUL,
} from "../actions/user";

function* userLoginSaga() {
  console.log("USER_LOGIN saga");
  yield takeEvery(USER_LOGIN_REQUESTED, userLoginRequestSaga);
  console.log("USER_LOGIN -- tata");
}

function* userLoginRequestSaga(action) {
  console.log("USER_LOGIN_SAGA: ", action);
  try {
    let usertoken = yield call(userLoginRequest, { userInfo: action.userData });
    yield put({ type: USER_LOGIN_SUCCESSFUL, usertoken });
  } catch {
    yield put({ type: USER_LOGIN_FAILED });
  }
}

export { userLoginSaga };
