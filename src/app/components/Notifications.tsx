"use client";
import React, { useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoUnread } from "react-icons/go";
import { GoRead } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getNotifications, readNotification } from "../store/notifications";

type Notification = {
  id: string;
  message: string;
  isRead: boolean;
};

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
        <IoNotificationsOutline size={30} className="text-red-500" />
        <h2 className="text-2xl font-bold">Bildirimler</h2>
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
              className={`flex flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg justify-between ${
                notification.isRead ? "bg-gray-100" : "bg-gray-900"
              }`}
            >
              <p>{notification.message}</p>
              {!notification.isRead ? (
                <GoUnread
                  size={20}
                  onClick={() => dispatch(readNotification(notification.id))}
                />
              ) : (
                <GoRead size={20} />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Notifications;
