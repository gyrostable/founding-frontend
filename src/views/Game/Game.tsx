import styled from "styled-components";
import { useContext } from "react";

import { Body } from "components/Misc";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import Level4 from "./components/Level4";
import SybilResistance from "./components/SybilResistance";
import SpectatorModeWarning from "./components/SpectatorModeWarning";
import { WindowHeader } from "react95";
import { StyledWindow as Window } from "components/react95";
// import { PrivacyPolicy } from "./components/PrivacyPolicy/PrivacyPolicy";
// import { PrivacyPolicyContext } from "contexts/PrivacyPolicy";
import { SpectatorModeContext } from "contexts/SpectatorMode";
// import { useWeb3Modal } from "contexts/Web3";
import { AiOutlineWarning } from "react-icons/ai";

const LevelWrapper = ({ levelName, children }) => (
  <StyledWindow className="window">
    <WindowHeader>{levelName}</WindowHeader>
    {children}
  </StyledWindow>
);

const LevelClosed = styled.div`
  align-items: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  justify-content: center;
  position: absolute;
  text-align: center;
  width: 99%;
  z-index: 1;

  h3 {
    font-size: 24px;
    margin: 20px;
  }
`;

const GameEndedMessage = styled.div`
  background: yellow;
  border-radius: 10px;
  color: black;
  padding: 20px 60px;
  text-align: center;
  margin-top: 40px;

  h1 {
    font-size: 42px;
    margin: 0 0;
  }

  h3 {
    font-size: 21px;
    margin: 20px 0;
  }
`;

const Game = () => {
  // const { hasAccepted } = useContext(PrivacyPolicyContext);
  const { isSpectatorMode } = useContext(SpectatorModeContext);
  // const { account } = useWeb3Modal();

  return (
    <>
      {isSpectatorMode && <SpectatorModeWarning />}
      <Body>
        <h1>Gyrosoft All-Weather Simulator</h1>
        {/* Remove PrivacyPolicy modal for end of game */}
        {/* {!hasAccepted && account && !isSpectatorMode && <PrivacyPolicy />} */}

        <GameEndedMessage>
          <AiOutlineWarning />
          <h1>The game has officially ended</h1>
          <h3>Stay tuned on Twitter and Discord for more...</h3>
        </GameEndedMessage>

        <LevelWrapper levelName="level4.exe">
          <LevelClosed>
            <h3>Level 4 Closed</h3>
            <p>The game has ended. Stay tuned on Twitter and Discord for more...</p>
          </LevelClosed>
          <Level4 />
        </LevelWrapper>

        <LevelWrapper levelName="level3.exe">
          <LevelClosed>
            <h3>Level 3 Closed</h3>
            <p>The game has ended. Stay tuned on Twitter and Discord for more...</p>
          </LevelClosed>
          <Level3 />
        </LevelWrapper>

        <LevelWrapper levelName="sybil-resistance.exe">
          <LevelClosed>
            <h3>Level 2.5 Closed</h3>
            <p>The game has ended. Stay tuned on Twitter and Discord for more...</p>
          </LevelClosed>
          <SybilResistance />
        </LevelWrapper>

        <LevelWrapper levelName="level2.exe">
          <LevelClosed>
            <h3>Level 2 Closed</h3>
            <p>The game has ended. Stay tuned on Twitter and Discord for more...</p>
          </LevelClosed>
          <Level2 />
        </LevelWrapper>

        <LevelWrapper levelName="level1.exe">
          <LevelClosed>
            <h3>Level 1 Closed</h3>
            <p>The game has ended. Stay tuned on Twitter and Discord for more...</p>
          </LevelClosed>
          <Level1 />
        </LevelWrapper>

        <div style={{ marginBottom: "50px" }} />
      </Body>
    </>
  );
};

const StyledWindow = styled(Window)`
  min-width: 800px;
  max-width: 1140px;
  margin-top: 50px;
  position: relative;
`;

export default Game;
