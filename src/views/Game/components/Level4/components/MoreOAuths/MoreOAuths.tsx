import { useState } from "react";
import { Link } from "react-router-dom";
import { Fieldset, Button } from "react95";
import { ChallengeTitle } from "../../Level4.styles";
import { Row, DisclaimerBox } from "./MoreOAuths.styles";
import { OAuthButton } from "./components/OAuthButton/OAuthButton";
import { useQuery } from "./hooks/useQuery";
import { useMoreOAuthsState } from "./hooks/useMoreOAuthsState";

export const MoreOAuths = () => {
  const [challengeState, challengeSetters] = useMoreOAuthsState();
  useQuery(challengeSetters);

  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState(
    localStorage.getItem("challengeVII-disclaimer-acknowledged") === "true"
  );

  // Handler function
  const handleContinue = () => {
    setDisclaimerAcknowledged(true);
    localStorage.setItem("challengeVII-disclaimer-acknowledged", "true");
  };

  return (
    <>
      <ChallengeTitle>Challenge VII: More OAuths</ChallengeTitle>
      <p>
        In this challenge, you can increase your Sybil score by confirming that you control eligible
        accounts from the below listed social platforms. Accounts are eligible if they meet certain
        requirements regarding the age and activity of the account. Read the instructions and see
        the criteria here:{" "}
        <a
          href="https://medium.com/gyroscope-protocol/challenge-vii-social-accounts-ff635973e194"
          target="_blank"
          rel="noreferrer"
        >
          <u>link</u>
        </a>
        .
      </p>
      <br />

      <p>
        Importantly, your social data is only used for verification and will not be stored. See the{" "}
        <Link to="/privacy-policy">
          <u>privacy policy</u>
        </Link>
        .
      </p>
      <br />
      <p>You may need to refresh the page after verifying your account.</p>
      <br />

      <Fieldset label="Progress">
        {disclaimerAcknowledged ? (
          <>
            <Row>
              <OAuthButton endpoint={"stackOvFl"} verified={challengeState.stackOvFl}>
                Stack Exchange
              </OAuthButton>
              <OAuthButton endpoint={"github/followers"} verified={challengeState.githubFollowers}>
                Github
              </OAuthButton>
              <OAuthButton
                endpoint={"twitter/followers"}
                verified={challengeState.twitterFollowers}
              >
                Twitter
              </OAuthButton>
              <OAuthButton endpoint={"reddit"} verified={challengeState.reddit}>
                Reddit
              </OAuthButton>
              <OAuthButton endpoint={"minecraft"} verified={challengeState.minecraft}>
                (NEW) Minecraft
              </OAuthButton>
            </Row>
          </>
        ) : (
          <DisclaimerBox>
            <p>
              DISCLAIMER: To get full potential points in Challenge VII, you should first complete
              Challenge VI if you are able, to the fullest extent possible.
            </p>
            <p>To proceed with Challenge VII, click below.</p>

            <Row>
              <Button onClick={handleContinue}>Continue</Button>
            </Row>
          </DisclaimerBox>
        )}
      </Fieldset>
    </>
  );
};
