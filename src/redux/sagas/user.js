import { call, put, takeEvery } from "redux-saga/effects";
import { userLoginRequest } from "../../api/user";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUESTED,
  USER_LOGIN_SUCCESSFUL,
} from "../actions/user";

function* userLoginSaga() {
  yield takeEvery(USER_LOGIN_REQUESTED, userLoginRequestSaga);
}

function* userLoginRequestSaga(action) {
  try {
    let userToken = yield call(userLoginRequest, { userInfo: action.userData });
    console.log({ userToken });
    yield put({ type: USER_LOGIN_SUCCESSFUL, userToken });
  } catch {
    yield put({ type: USER_LOGIN_FAILED });
  }
}

export { userLoginSaga };
