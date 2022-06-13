import { Web3Provider } from "@ethersproject/providers";
import { Gyro } from "@gyrostable/sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import Web3Modal, { ProviderController } from "web3modal";
import Context from "./Context";

const INFURA_ID = "ef843aa2b4a94679aa559fae038cb07b";

const NETWORK_NAME = "mainnet";

interface Web3Config {
  autoLoad: boolean;
  infuraId: string;
  network: string;
}

const defaultConfig: Web3Config = {
  autoLoad: true,
  infuraId: INFURA_ID,
  network: NETWORK_NAME,
};

const Provider = ({ children, config = {} }) => {
  const [provider, setProvider] = useState<Web3Provider>();
  const [gyro, setGyro] = useState<Gyro>();
  const [account, setAccount] = useState<string>();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const { autoLoad, infuraId, network } = Object.assign(defaultConfig, config);
  const [connectErrMsg, setConnectErrMsg] = useState<string>("");

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        network,
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId,
            },
          },
        },
      }),
    [infuraId, network]
  );

  const subscribeProvider = (provider: ProviderController, gyro: Gyro) => {
    provider.on("connect", () => {
      console.log("connected");
    });
    provider.on("close", () => {}); // do some sort of reset
    provider.on("accountsChanged", (accounts) => {
      const account = accounts[0];
      console.log("new account set", account);
      localStorage.clear();
      setAccount(account);
      gyro.changeAccount(account);
    });
  };

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const web3Provider = new Web3Provider(newProvider);
    setProvider(web3Provider);

    try {
      const newGyro = await Gyro.create(web3Provider);
      setGyro(newGyro);
      subscribeProvider(newProvider, newGyro);
    } catch (e) {
      setConnectErrMsg(e.toString() + ". Please use Kovan");
    }

    const web3 = new Web3(newProvider);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }, [web3Modal]);

  const clearState = async () => {
    web3Modal.clearCachedProvider();
    setGyro(null);
    setAccount("");
    setProvider(null);
    setConnectErrMsg("");
  };

  const logoutOfWeb3Modal = useCallback(clearState, [web3Modal]);

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      setAutoLoaded(true);
      loadWeb3Modal();
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return (
    <Context.Provider
      value={{
        loadWeb3Modal,
        logoutOfWeb3Modal,
        provider,
        gyro,
        account,
        autoLoaded,
        connectErrMsg,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Provider;
