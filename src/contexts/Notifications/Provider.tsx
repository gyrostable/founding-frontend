import React, { useState } from "react";
import Context from "./Context";
import NotificationData from "./types";

const Provider = ({ children }) => {
  // How to use the default from Context? - why have to reinit here?
  const defaultNotification = {
    message: "",
    title: "Notifications",
    copy: "",
    child: undefined,
  };

  const [notification, setNotification] = useState<NotificationData>(defaultNotification);

  const updateNotification = (update) => {
    setNotification({ ...notification, ...update });
  };

  const clearNotification = () => {
    setNotification({
      child: undefined,
      title: "",
      message: "",
      copy: "",
    });
  };

  return (
    <Context.Provider
      value={{
        notification,
        updateNotification,
        clearNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
