import { SpectatorModeContext } from "contexts/SpectatorMode";
import { useContext } from "react";
import { Button, Fieldset } from "react95";

import InputItem from "../../../../../../components/InputItem/InputItem";
import { ChallengeTitle, Row, NumberBox } from "../../Level4.styles";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";

const sigPlaceHolder = `{"address":"0x...","msg":"0x...","sig":"0x...","version":"2"}`;

export const GovVoters = () => {
  const { submitting, input, setInput, submit, checkValue, setCheckValue } =
    useChallengeState("govVoters");

  useCheckCompleted("govVoters", null, setCheckValue);

  const govVoteCount = Array.isArray(checkValue) ? checkValue.metadata?.toNumber() : null;

  const { isSpectatorMode } = useContext(SpectatorModeContext);

  return (
    <>
      <ChallengeTitle>Challenge III: Governance Participants</ChallengeTitle>

      <p>
        If you have many eligible mainnet addresses it is in your interest to use them <em>all</em>{" "}
        to sign off on one testnet account as you will gain more Sybil points and be more likely to
        pass the final Frog Games tally.
      </p>
      <br />

      <p>
        This challenge is for those who have been voting on governance proposals of other projects
        via Snapshot. Read the instructions here:{" "}
        <a
          href="https://medium.com/gyroscope-protocol/gyroscope-level-4-frog-games-iii-36d7cf33558c"
          target="_blank"
          rel="noreferrer"
        >
          <u>link</u>
        </a>
      </p>
      <br />
      <ul>
        <li>
          <p>
            1. Go to{" "}
            <a href="https://app.mycrypto.com/sign-message" target="_blank" rel="noreferrer">
              <u>mycrypto.com/sign-message</u>
            </a>{" "}
            and connect a wallet that has participated in governance decisions.
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

        <Row>
          Challenge III score: <NumberBox style={{ fontSize: "20px" }}>{govVoteCount}</NumberBox>
        </Row>
      </Fieldset>
    </>
  );
};
