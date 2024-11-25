import { createSlice } from "@reduxjs/toolkit";

export type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  timeElapsed: string;
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [] as Notification[],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        ...action.payload,
      });

      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },

    getNotifications: (state) => {
      state.notifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );

      state.notifications.forEach((notification) => {
        const diff =
          (new Date().getTime() - new Date(notification.createdAt).getTime()) /
          1000;
        let timeElapsed = "1 dk";
        if (diff < 60) {
          timeElapsed = "1 dk";
        } else if (diff < 60 * 60) {
          timeElapsed = `${Math.round(diff / 60)} dk`;
        } else if (diff < 60 * 60 * 24) {
          timeElapsed = `${Math.round(diff / (60 * 60))} saat`;
        } else {
          timeElapsed = `${Math.round(diff / (60 * 60 * 24))} gün`;
        }
        notification.timeElapsed = timeElapsed;
      });
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
