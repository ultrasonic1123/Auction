import { all } from "redux-saga/effects";
import { userLoginSaga } from "./user";

function* rootSaga() {
  console.log("Running rootSaga");
  yield all([userLoginSaga()]);
}

export default rootSaga;
