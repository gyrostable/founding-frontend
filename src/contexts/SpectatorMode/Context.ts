import { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

interface SpectatorModeProps {
  isSpectatorMode: boolean;
  toggleSpectatorMode: () => void;
  exitSpectatorMode: () => void;
  spectatorAccount: string;
  setSpectatorAccount: Dispatch<SetStateAction<string>>;
}

const Context = createContext<SpectatorModeProps>({
  isSpectatorMode: null,
  toggleSpectatorMode: null,
  exitSpectatorMode: null,
  spectatorAccount: null,
  setSpectatorAccount: null,
});

export default Context;
