import { useContext } from "react";

import { NotificationsContext } from "contexts/Notifications";

const useNotifications = () => {
  return {
    ...useContext(NotificationsContext),
  };
};

export default useNotifications;
