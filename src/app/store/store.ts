import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./data";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;