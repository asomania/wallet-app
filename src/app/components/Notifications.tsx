"use client";
import React, { useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoUnread } from "react-icons/go";
import { GoRead } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getNotifications, readNotification } from "../store/notifications";
import { Notification } from "../store/notifications";

const Notifications = () => {
  const notifications: Notification[] = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <IoNotificationsOutline
          size={30}
          className="text-black dark:text-white"
        />
        <h2 className="text-2xl font-bold dark:text-white">Bildirimler</h2>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">Henüz bildirimin yok.</p>
        )}
        {notifications
          .slice()
          .reverse()
          .map((notification) => (
            <div
              key={notification.id}
              className={`flex flex-row items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg justify-between shadow-lg border border-gray-200 dark:border-gray-700 dark:text-white ${
                notification.isRead
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <p>{notification.message}</p>
              <div className="flex flex-row items-center gap-4">
                <p>{notification.timeElapsed || "1 dk"}</p>
                {!notification.isRead ? (
                  <GoUnread
                    size={20}
                    onClick={() => dispatch(readNotification(notification.id))}
                  />
                ) : (
                  <GoRead size={20} />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Notifications;
