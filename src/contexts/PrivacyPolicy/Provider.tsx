import { useState } from "react";
import Context from "./Context";
import { useCheckCompleted } from "views/Game/components/Level4/components/hooks/useCheckCompleted";

const Provider = ({ children }) => {
  const [hasAccepted, setHasAccepted] = useState(true);

  // Check if user address has already accepted privacy policy
  useCheckCompleted("privacyPolicy", setHasAccepted);

  return (
    <Context.Provider
      value={{
        hasAccepted,
        setHasAccepted,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
