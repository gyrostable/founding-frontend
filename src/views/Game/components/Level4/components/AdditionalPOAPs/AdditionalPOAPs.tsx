import { SpectatorModeContext } from "contexts/SpectatorMode";
import { useContext } from "react";
import { Button, Fieldset } from "react95";

import InputItem from "../../../../../../components/InputItem/InputItem";
import { ChallengeTitle, NumberBox } from "../../Level4.styles";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";
import { ScoreRow, ScoreContainer } from "./AdditionalPOAPs.styles";
import { decodeCheckValue } from "./utils/decodeCheckValue";

const sigPlaceHolder = `{"address":"0x...","msg":"0x...","sig":"0x...","version":"2"}`;

export const AdditionalPOAPs = () => {
  const { submitting, input, setInput, submit, checkValue, setCheckValue } =
    useChallengeState("additionalPOAPs");

  useCheckCompleted("additionalPOAPs", null, setCheckValue);

  const [communityCallsCount, strongAntiSybilCount, weakAntiSybilCount] =
    decodeCheckValue(checkValue);

  const { isSpectatorMode } = useContext(SpectatorModeContext);

  return (
    <>
      <ChallengeTitle>Challenge IV: Additional POAPs</ChallengeTitle>

      <p>
        If you have many eligible mainnet addresses it is in your interest to use them all to sign
        off on one testnet account as you will gain more Sybil points and be more likely to pass the
        final Frog Games tally.
      </p>
      <br />

      <p>
        This challenge expands the list of eligible POAPs. Use your POAPs from Virtual Events,
        Community Calls and 'High-involvement activities' (i.e. in-person-, educational-, and
        working group events) to pass. UPDATE: Gyroscope Newsletter POAPs are now also included in
        this challenge. Read the instructions here:{" "}
        <a href="https://medium.com/@jooooo5as/5660a6ff6a4f" target="_blank" rel="noreferrer">
          <u>link</u>
        </a>
        .
      </p>
      <br />
      <ul>
        <li>
          <p>
            1. Go to{" "}
            <a href="https://app.mycrypto.com/sign-message" target="_blank" rel="noreferrer">
              <u>mycrypto.com/sign-message</u>
            </a>{" "}
            and connect a wallet that owns eligible POAPs.
          </p>
        </li>
        <br />
        <li>2. Paste your testnet address, sign the message, and copy it to clipboard</li>
        <br />
        <li>3. Paste it below</li>
      </ul>
      <br />
      <p>You may need to refresh the page after submitting the signed message.</p>
      <br />
      <Fieldset label="Progress">
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

        <ScoreRow>
          <ScoreContainer>
            <p>
              Challenge IV score for <br />
              Virtual Events
            </p>
            <NumberBox style={{ fontSize: "20px" }}>{weakAntiSybilCount}</NumberBox>
          </ScoreContainer>
          <ScoreContainer>
            <p>
              Challenge IV score for <br />
              Community Calls
            </p>
            <NumberBox style={{ fontSize: "20px" }}>{communityCallsCount}</NumberBox>
          </ScoreContainer>
          <ScoreContainer>
            <p>
              Challenge IV score for <br /> High-involvement activities
            </p>
            <NumberBox style={{ fontSize: "20px" }}>{strongAntiSybilCount}</NumberBox>
          </ScoreContainer>
        </ScoreRow>
      </Fieldset>
    </>
  );
};
