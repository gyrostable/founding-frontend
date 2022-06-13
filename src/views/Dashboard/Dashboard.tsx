import { MonetaryAmount } from "@gyrostable/sdk";

import { useEffect, useState } from "react";
import { Tab, TabBody, Tabs, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";
import { Body, Button, H1, H3 } from "components/Misc";
import Orb from "components/Orb";
import useBalances from "contexts/Balances/useBalances";
import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { Mint, Redeem } from "./components/MintRedeem";
import MetaMinting from "./components/MetaMinting";
import { numberWithCommas } from "helpers";

import { StyledWindow } from "components/react95";

const Dashboard = () => {
  const { provider, account, gyro } = useWeb3Modal();
  const { gyroBalance, fetchAll, reserveValues } = useBalances();

  const [visibility, setVisibility] = useState<boolean>(false);

  const onMintRedeem = (_amount: MonetaryAmount) => {
    fetchAll(gyro);
  };

  const onMint = (amountMinted: MonetaryAmount) => {
    // TODO: show in a toast or something
    console.log(`minted ${amountMinted.toNormalizedString()} GYRO`);
    onMintRedeem(amountMinted);
  };

  const onRedeem = (amountRedeemed: MonetaryAmount) => {
    console.log(`redeemed ${amountRedeemed.toNormalizedString()} GYRO`);
    onMintRedeem(amountRedeemed);
  };

  // `Enter` button is nice for 1st time experience... currently taken away
  // Could store state in localstorage
  useEffect(() => {
    setVisibility(!!account);
  }, [account, gyro]);

  const [activeTab, setActiveTab] = useState<Number>(0);
  const [activeTabTwo, setActiveTabTwo] = useState<Number>(0);

  const handleChange = (e, value: number) => setActiveTab(value);
  const secondHandleChange = (e, value: number) => setActiveTabTwo(value);

  return (
    <Body>
      <OrbRow>
        <Orb size={75} color2={"#965300"} color3={"#f9b857"} />
        <H3 style={{ float: "right" }}>
          {gyroBalance && `${numberWithCommas(gyroBalance.toNormalizedString())} GYD`}
          <br />
          {gyroBalance && `Wallet Balance`}
        </H3>
      </OrbRow>
      <H1>Gyroscope, the new all-weather stablecoin</H1>
      <EnterButton hidden={!provider || visibility} onClick={() => setVisibility(true)}>
        Enter
      </EnterButton>

      {account && visibility ? (
        <Window style={{ width: "min(1500px, 90%)" }}>
          <WindowHeader active={true} className="window-header">
            MintRedeem.exe
          </WindowHeader>
          <WindowContent>
            <MetaMinting />
            <Tabs value={activeTab} onChange={handleChange}>
              <Tab value={0}>Mint</Tab>
              <Tab value={1}>Redeem</Tab>
            </Tabs>
            <TabBody>
              {activeTab === 0 && <Mint onMint={onMint} />}
              {activeTab === 1 && <Redeem onRedeem={onRedeem} />}
            </TabBody>
          </WindowContent>
        </Window>
      ) : null}

      {account && visibility ? (
        <Window style={{ width: "min(1500px, 90%)" }}>
          <WindowHeader active={true} className="window-header">
            ReserveStatus.exe
          </WindowHeader>
          <WindowContent>
            <Tabs value={activeTabTwo} onChange={secondHandleChange}>
              <Tab value={0}>Currency reserves</Tab>
              {/* <Tab value={1}>More...</Tab> */}
            </Tabs>
            <TabBody>
              <ol>
                {reserveValues.map((reserve, i) => (
                  <li key={i}>
                    {reserve.tokenSymbols.join("/")} pool: $
                    {numberWithCommas(reserve.amount.toNormalizedString())} (USD)
                  </li>
                ))}
              </ol>
            </TabBody>
          </WindowContent>
        </Window>
      ) : null}
    </Body>
  );
};

const Window = styled(StyledWindow)`
  margin: 50px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const EnterButton = styled(Button)`
  position: absolute;
  bottom: 2vh;
`;

const OrbRow = styled.div`
  display: inline;
`;

export default Dashboard;
