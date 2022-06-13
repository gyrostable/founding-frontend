import { createContext } from "react";
import NotificationData from "./types";

interface NotificationsContext {
  notification: NotificationData;
  updateNotification: (update: NotificationData) => void;
  clearNotification: () => void;
}

const Context = createContext<NotificationsContext>({
  notification: {
    message: "",
    title: "Notifications",
    copy: "",
    child: undefined,
  },
  updateNotification: (_update: NotificationData) => {}, // this doesn't seem right
  clearNotification: () => {},
});

export default Context;
