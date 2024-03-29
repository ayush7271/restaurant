import saga from "./saga/saga.js";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import restaurentSlice from "./slice/restaurentSlice.js";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    restaurentSlice: restaurentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(saga);
