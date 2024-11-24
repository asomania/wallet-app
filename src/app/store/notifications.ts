import { createSlice } from "@reduxjs/toolkit";

export type Notification = {
  id: string;
  message: string;
  isRead: boolean;
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [] as Notification[],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
    getNotifications: (state) => {
      state.notifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
    },
    readNotification: (state, action) => {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
  },
});

export const { addNotification, readNotification, getNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
