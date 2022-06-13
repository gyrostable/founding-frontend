import { Button, Fieldset, Checkbox } from "react95";
import InputItem from "components/InputItem";
import { ChallengeTitle } from "../../Level4.styles";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";
import { useContext } from "react";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const sigPlaceHolder = `{"address":"0x...","msg":"0x...","sig":"0x...","version":"2"}`;

export const SybilList = () => {
  const { isChallengePass, setIsChallengePass, submitting, input, setInput, submit } =
    useChallengeState("sybilList");

  useCheckCompleted("sybilList", setIsChallengePass);

  const { isSpectatorMode } = useContext(SpectatorModeContext);

  return (
    <>
      <ChallengeTitle>Challenge II: Sybil List</ChallengeTitle>
      <p>
        This challenge will only work for those who are already verified on Sybil.org. Read the
        instructions here:{" "}
        <a
          href="https://medium.com/gyroscope-protocol/gyroscope-level-4-let-the-frog-games-continue-fee463ca0f19"
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
            and connect a wallet that is verified on sybil.org.
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
          disabled={submitting || isChallengePass}
          onChange={(e) => setInput(e.target.value)}
          children={
            <Button onClick={submit} disabled={submitting || isChallengePass || isSpectatorMode}>
              {submitting ? "tx in progress" : "Submit"}
            </Button>
          }
        />
        <Checkbox label="Completed Frog Games: Challenge II" checked={isChallengePass} />
      </Fieldset>
    </>
  );
};
