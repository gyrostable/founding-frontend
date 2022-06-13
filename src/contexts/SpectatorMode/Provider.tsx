import { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  const [isSpectatorMode, setSpectatorMode] = useState<boolean>(false);
  const [spectatorAccount, setSpectatorAccount] = useState<string>();

  //   Spectator Mode functions
  const toggleSpectatorMode = () => {
    if (isSpectatorMode) {
      setSpectatorAccount("");
    }
    setSpectatorMode((prev) => !prev);
  };

  const exitSpectatorMode = () => {
    setSpectatorMode(false);
  };

  return (
    <Context.Provider
      value={{
        isSpectatorMode,
        toggleSpectatorMode,
        exitSpectatorMode,
        spectatorAccount,
        setSpectatorAccount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
