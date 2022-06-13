import { useChallengeState } from "../hooks/useChallengeState";
import { useCheckCompleted } from "../hooks/useCheckCompleted";
import { ChallengeTitle, Row } from "../../Level4.styles";
import { Fieldset } from "react95";
import { NumberBox } from "../../Level4.styles";

export const DiscordChallenge = () => {
  const { checkValue, setCheckValue } = useChallengeState("discord-challenge-1");

  useCheckCompleted("discord-challenge-1", null, setCheckValue);

  return (
    <>
      <ChallengeTitle>Challenge V</ChallengeTitle>
      <p>
        This challenge is the beginning of a series of more active ‘Proof of Work’ challenges, that
        complement the current series of ‘Proof of Past Work’ challenges.
      </p>
      <br />
      <p>
        To pass this challenge users must have participated in the Discord event or joined the
        Twitter AMA.
      </p>
      <br />
      <p>Scoring was executed as follows:</p>
      <p>- 1 point was awarded per met condition:</p>
      <br />
      <p>Condition 1: provide a valid address during the challenge</p>
      <p>
        Condition 2: provide a verified paragraph describing the need for these Sybil challenges
      </p>
      <p>Condition 3: join the Twitter AMA</p>
      <br />
      <p>
        - 0 points were awarded to those who did not attempt the challenge, or who provided an
        invalid address. Those who attempted to provide multiple addresses in the Discord challenge
        were disqualified, and hence receive 0 points.
      </p>

      <br />
      <Fieldset label="Progress">
        <Row>
          Challenge V score:
          <NumberBox>{checkValue?.metadata?.toString()}</NumberBox>
        </Row>
      </Fieldset>
    </>
  );
};
