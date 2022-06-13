import { Button, Fieldset, Checkbox } from "react95";

import { ChallengeTitle } from "../../Level4.styles";
import InputItem from "components/InputItem";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";
import { useContext } from "react";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const sigPlaceHolder = `{"address":"0x...","msg":"0x...","sig":"0x...","version":"2"}`;

export const InPersonPOAP = () => {
  const { isChallengePass, setIsChallengePass, submitting, input, setInput, submit } =
    useChallengeState("poap");

  useCheckCompleted("poap", setIsChallengePass);

  const { isSpectatorMode } = useContext(SpectatorModeContext);

  return (
    <>
      <ChallengeTitle>Challenge I: (In-person) Event POAPs </ChallengeTitle>

      <p>This challenge will only work for those who have an eligible POAP.</p>
      <br />
      <ul>
        <li>
          1. Go to&nbsp;
          <a href="https://app.mycrypto.com/sign-message" target="_blank" rel="noreferrer">
            <u>mycrypto.com/sign-message</u>
          </a>
          &nbsp;and connect a wallet that has a POAP in it.
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

        <Checkbox label="Completed Frog Games: Challenge I" checked={isChallengePass} />
      </Fieldset>
    </>
  );
};
