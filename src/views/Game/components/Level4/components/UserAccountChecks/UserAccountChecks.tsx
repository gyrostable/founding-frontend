import { Fieldset, Button } from "react95";

import { ChallengeTitle, Row, NumberBox } from "../../Level4.styles";
import { ButtonContainer, HiddenInput, VerifiedMessage } from "./UserAccountChecks.styles";
import { useCompareJson } from "./hooks/useCompareJson";
import { UserAccountCheckForm } from "./components/UserAccountCheckFrom/UserAccountCheckForm";
import { useQuery } from "./components/UserAccountCheckFrom/hooks/useQuery";
import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SpectatorModeContext } from "contexts/SpectatorMode";

export const UserAccountChecks = () => {
  const { verified, json, compareJson } = useCompareJson();
  const githubPass = useQuery(json, "github");
  const twitterPass = useQuery(json, "twitter");

  const { isChallengePass: phonePass, setIsChallengePass: setPhonePass } =
    useChallengeState("phone");
  useCheckCompleted("phone", setPhonePass);

  const { isSpectatorMode } = useContext(SpectatorModeContext);

  return (
    <>
      <ChallengeTitle>Challenge VI: User Account Checks</ChallengeTitle>

      <p>
        Challenge VI is connected with the previous level 2.5 from the summer. In Level 2.5, users
        were asked to commit to their Github, Twitter, and/or phone number. This challenge verifies
        that information.
      </p>
      <br />

      <p>
        All players should be eligible for this challenge. You will need your .json file from level
        2.5 and access to your social accounts committed to in that file. Read the instructions
        here:{" "}
        <a
          href="https://medium.com/@jooooo5as/challenge-vi-user-account-checks-b51eb7693307"
          target="_blank"
          rel="noreferrer"
        >
          <u>link</u>.
        </a>
      </p>
      <br />
      <p>
        Your social data is only used for verification and will not be stored. See the{" "}
        <Link to="/privacy-policy">
          <u>privacy policy</u>
        </Link>
        .
      </p>
      <br />
      <p>You may need to refresh the page after verifying your account.</p>
      <br />

      <br />
      <Fieldset label="Progress">
        <Fieldset label="Upload">
          <Row>
            <ButtonContainer>
              <Button disabled={isSpectatorMode}>Upload JSON file</Button>
              <HiddenInput
                id="json-upload"
                type="file"
                accept="application/JSON"
                onChange={compareJson}
              />
            </ButtonContainer>
            {verified && <VerifiedMessage>JSON verified</VerifiedMessage>}
          </Row>
        </Fieldset>

        {verified && !isSpectatorMode && (
          <UserAccountCheckForm
            twitterPass={twitterPass}
            githubPass={githubPass}
            phonePass={phonePass}
            json={JSON.parse(json)}
          />
        )}

        <Row>
          Challenge VI score:{" "}
          <NumberBox style={{ fontSize: "20px" }}>
            {Number(twitterPass) + Number(githubPass) + Number(phonePass)}
          </NumberBox>
        </Row>
      </Fieldset>
    </>
  );
};
