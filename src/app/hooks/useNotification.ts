import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getNotifications, readNotification } from "../store/notifications";
import { Notification } from "../store/notifications";

const useNotifications = () => {
  const dispatch = useDispatch();

  const notifications: Notification[] = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const markAsRead = (notificationId: string) => {
    dispatch(readNotification(notificationId));
  };

  return {
    notifications,
    markAsRead,
  };
};

export default useNotifications;
