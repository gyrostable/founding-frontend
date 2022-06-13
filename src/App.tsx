import { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import ErrorWindow from "components/ErrorWindow";
import SystemStatus from "components/SystemStatus";
import Footer from "components/Footer";
import Header from "components/Header";
import { BalancesProvider } from "contexts/Balances";
import { PrivacyPolicyProvider } from "contexts/PrivacyPolicy";
import { Web3Provider, useWeb3Modal } from "contexts/Web3";
import { NotificationsProvider, useNotifications } from "contexts/Notifications";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { styleReset } from "react95";
import modernDark from "react95/dist/themes/modernDark";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Dashboard from "views/Dashboard";
import Game from "views/Game";
import ClaimNFT from "./views/ClaimNFT";
import { Terms } from "views/Terms/Terms";
import { isIOS } from "react-device-detect";
import { Body } from "components/Misc";
import { PrivacyPolicy } from "views/PrivacyPolicy/PrivacyPolicy";
import { SpectatorModeProvider } from "contexts/SpectatorMode";
import { NFTProvider } from "contexts/NFT";
import geoblockedCountryCodes from "./static/geoblockedCountryCodes.json";
import chainalysisABI from "./static/chainalysisABI.json";
import { ethers } from "ethers";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'helvetica';
  }  

  .dNone {
    display: none;
  }

  ${styleReset}
`;

function App() {
  // const isAppSubdomain = window.location.host.split(".")[0] === "app";

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={modernDark}>
        <Providers>
          <RenderPage />
        </Providers>
      </ThemeProvider>
    </>
  );
}

const RenderPage: React.FC = () => {
  const [appState, setAppState] = useState<string>(null);
  const { account } = useWeb3Modal();

  useEffect(() => {
    (async function () {
      if (isIOS) return setAppState("mobile");
      if (await checkInvalidIP()) return setAppState("invalidIP");
      if (await checkInvalidAccount(account)) return setAppState("invalidAccount");
      return setAppState("allChecksPassed");
    })();
  }, [account]);

  return (
    {
      mobile: <Message message="Gyroscope is not currently enabled for iOS" />,
      invalidIP: <Message message="Gyroscope is not available in your country" />,
      invalidAccount: <Message message="Your account has been sanctioned and restricted" />,
      allChecksPassed: (
        <Router>
          <Header />
          <ErrorHandling />
          <SystemStatus />
          <Switch>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms-of-service">
              <Terms />
            </Route>
            <Route path="/claim">
              <ClaimNFT />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
          <Footer />
        </Router>
      ),
    }[appState] ?? <Body />
  );
};

const Home = () => <div>Home...</div>;

const Message = ({ message }) => (
  <>
    <Body>
      <ErrorWindow message={message} isMobile={true} />
    </Body>
    <Footer isMobile={true} />
  </>
);

const ErrorHandling = () => {
  // Connection errors take precedent over other errors
  const { connectErrMsg } = useWeb3Modal();
  const {
    notification: { message },
  } = useNotifications();

  return <ErrorWindow message={connectErrMsg || message} />;
};

const Providers: React.FC = ({ children }) => {
  return (
    <Web3Provider>
      <BalancesProvider>
        <NotificationsProvider>
          <SpectatorModeProvider>
            <PrivacyPolicyProvider>
              <NFTProvider>{children}</NFTProvider>
            </PrivacyPolicyProvider>
          </SpectatorModeProvider>
        </NotificationsProvider>
      </BalancesProvider>
    </Web3Provider>
  );
};

async function checkInvalidIP() {
  try {
    const res = await fetch(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=cbbe05ede2d7429cacb8c08ce9dda1f9"
    );
    const json = await res.json();
    return geoblockedCountryCodes.includes(json.country_code);
  } catch (e) {
    console.error("Unable to determine IP address or region code", e);
    return false;
  }
}

async function checkInvalidAccount(account: string | null) {
  try {
    if (!account) return false;
    const chainalysis = new Contract(
      "0x40c57923924b5c5c5455c48d93317139addac8fb",
      chainalysisABI,
      ethers.getDefaultProvider()
    );
    return await chainalysis.isSanctioned(account);
  } catch (e) {
    console.error("Invalid ETH address failure:", e);
    return false;
  }
}

export default App;
