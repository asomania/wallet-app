import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./data";
import notificationsReducer from "./notifications";
export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
