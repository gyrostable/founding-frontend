import { Button, Fieldset, Checkbox } from "react95";

import { ChallengeTitle, NumberBox } from "../../Level4.styles";
import InputItem from "components/InputItem";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";
import { useDeFiWhitelistAndKYCLogic } from "./hooks/useDeFiWhitelistAndKYCLogic";
import { Row, ScoreContainer, ButtonsContainer } from "./DeFiWhitelistAndKYC.styles";
import { useContext } from "react";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const sigPlaceHolder = `{"address":"0x...","msg":"0x...","sig":"0x...","version":"2"}`;

export const DeFiWhitelistAndKYC = () => {
  const { isChallengePass: goldfinchPass, setIsChallengePass: setGoldfinchPass } =
    useChallengeState("goldfinchKYC");

  const { checkValue: whitelistValue, setCheckValue: setWhitelistValue } =
    useChallengeState("megaWhitelist");

  const { isChallengePass: coinbasePass, setIsChallengePass: setCoinbasePass } =
    useChallengeState("coinbase");

  const { checkValue: discordValue, setCheckValue: setDiscordValue } = useChallengeState("discord");

  useCheckCompleted("goldfinchKYC", setGoldfinchPass);
  useCheckCompleted("megaWhitelist", null, setWhitelistValue);
  useCheckCompleted("coinbase", setCoinbasePass);
  useCheckCompleted("discord", null, setDiscordValue);

  const { input, setInput, submit, submitting } = useDeFiWhitelistAndKYCLogic(setGoldfinchPass);

  const { isSpectatorMode } = useContext(SpectatorModeContext);

  return (
    <>
      <ChallengeTitle>
        Challenge VIII: DeFi whitelist, community contributors, and optional KYC
      </ChallengeTitle>
      <p>
        In this challenge you can{" "}
        <span style={{ fontWeight: "bold" }}>
          increase your Sybil score with any or all of the following
        </span>
        : (1) confirm you control a whitelisted address, (2) claim Sybil points for community
        contributions, or (3) pass (or have passed) a KYC.
      </p>
      <br />
      <p>
        (1) <span style={{ fontWeight: "bold" }}>DeFi whitelist</span> with almost 100k accounts
        from early and particularly active DeFi users is eligible.{" "}
        <a href="https://app.mycrypto.com/sign-message" target="_blank" rel="noreferrer">
          {" "}
          <u>Sign using your address as per the instructions</u>
        </a>
        .
      </p>
      <br />
      <p>
        (2) <span style={{ fontWeight: "bold" }}>Community contributors</span> may claim Sybil
        points for contributions by logging-in via Discord.
      </p>
      <br />
      <p>
        (3) Optionally, <span style={{ fontWeight: "bold" }}>KYC'ed individuals</span> can also gain
        Sybil points:
      </p>
      <br />
      <p>
        (3a) Start a KYC with Goldfinch and Persona. Importantly, no personally identifiable data is
        stored on-chain. Upon completing the KYC you will obtain an NFT. Sign a message from the
        address holding the NFT to gain Sybil points.
        <a href="https://app.goldfinch.finance/verify" target="_blank" rel="noreferrer">
          {" "}
          <u>Start KYC</u>
        </a>
        .
      </p>
      <br />
      <p>
        (3b) Use your Coinbase account to gain Sybil points by logging in via OAuth. Importantly, no
        sensitive information will be accessed or stored. Login below.
      </p>

      <br />
      <p>
        Read the instructions here:
        <a href="https://medium.com/@jooooo5as/8eb3f184ff1d" target="_blank" rel="noreferrer">
          {" "}
          <u>link</u>.
        </a>
      </p>
      <br />
      <p>You may need to refresh the page after verifying your account.</p>
      <br />
      <Fieldset label="Progress ">
        <InputItem
          label="Signed Message"
          value={input}
          placeholder={sigPlaceHolder}
          disabled={submitting}
          onChange={(e) => setInput(e.target.value)}
          children={
            <Button onClick={submit} disabled={submitting || isSpectatorMode}>
              {submitting ? "tx in progress" : "Submit"}
            </Button>
          }
        />
        <Fieldset label="Login">
          <ButtonsContainer>
            <a href="https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/auth/discord">
              <Button disabled={Number(discordValue?.metadata?.toString()) > 0 || isSpectatorMode}>
                Login to Discord
              </Button>
            </a>
            <a href="https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/auth/coinbase">
              <Button disabled={coinbasePass || isSpectatorMode}>Login to Coinbase</Button>
            </a>
          </ButtonsContainer>
        </Fieldset>

        <Row>
          <Checkbox label="Goldfinch KYC check passed" checked={goldfinchPass} />

          <ScoreContainer>
            <p>DeFi whitelist score:</p>
            <NumberBox>{whitelistValue?.metadata?.toString()}</NumberBox>
          </ScoreContainer>
        </Row>
        <Row>
          <Checkbox label="Coinbase KYC check passed" checked={coinbasePass} />

          <ScoreContainer>
            <p>Discord score:</p>
            <NumberBox>{discordValue?.metadata?.toString()}</NumberBox>
          </ScoreContainer>
        </Row>
      </Fieldset>
    </>
  );
};
