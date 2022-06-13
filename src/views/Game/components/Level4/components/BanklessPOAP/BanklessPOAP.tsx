import { Button, Fieldset, Checkbox } from "react95";

import InputItem from "../../../../../../components/InputItem/InputItem";
import { ChallengeTitle } from "../../Level4.styles";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";

const sigPlaceHolder = `{"address":"0x...","msg":"0x...","sig":"0x...","version":"2"}`;

export const BanklessPOAP = () => {
  const { isChallengePass, setIsChallengePass, submitting, input, setInput, submit } =
    useChallengeState("bankless");

  useCheckCompleted("bankless", setIsChallengePass);

  return (
    <>
      <ChallengeTitle>Challenge III: Bankless Membership POAP</ChallengeTitle>
      <p>This challenge will only work for those who have a membership POAP of Bankless.</p>
      <br />
      <ul>
        <li>
          <p>
            1. Go to{" "}
            <a href="https://app.mycrypto.com/sign-message" target="_blank" rel="noreferrer">
              <u>mycrypto.com/sign-message</u>
            </a>{" "}
            and connect a wallet that has a POAP in it.
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
            <Button onClick={submit} disabled={submitting}>
              {submitting ? "tx in progress" : "Submit"}
            </Button>
          }
        />
        <Checkbox label="Passed Frog Games: Challenge III" checked={isChallengePass} />
      </Fieldset>
    </>
  );
};
