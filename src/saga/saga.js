import { call, put, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import {
  restaurentSliceFailure,
  restaurentSliceRequest,
  restaurentSliceSuccess,
} from "../slice/restaurentSlice";
const callAPI = async ({ url, method, data, headers }) => {
  return await Axios({
    url,
    method,
    data,
    headers,
  });
};

export function* restaurentSliceRequestSaga() {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = yield call(() =>
      callAPI({
        url: `https://jsonplaceholder.typicode.com/users`,
        headers: headers,
      })
    );
    yield put(restaurentSliceSuccess({ data: response.data }));
  } catch (e) {
    yield put(restaurentSliceFailure());
  }
}
function* saga() {
  yield takeLatest(restaurentSliceRequest, restaurentSliceRequestSaga);
}

export default saga;
