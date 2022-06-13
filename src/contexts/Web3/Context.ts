import { Web3Provider } from "@ethersproject/providers";
import { Gyro } from "@gyrostable/sdk";
import { createContext } from "react";

interface Web3Props {
  provider: Web3Provider;
  gyro: Gyro;
  account: string;
  autoLoaded: boolean;
  loadWeb3Modal: () => Promise<void>;
  logoutOfWeb3Modal: () => Promise<void>;
  connectErrMsg: string;
}

const Context = createContext<Web3Props>({
  provider: null,
  gyro: null,
  account: "",
  autoLoaded: false,
  loadWeb3Modal: () => Promise.resolve(),
  logoutOfWeb3Modal: () => Promise.resolve(),
  connectErrMsg: "",
});

export default Context;
