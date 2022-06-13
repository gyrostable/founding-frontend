import { useState, useRef, useContext } from "react";
import { Container } from "./PrivacyPolicyModal.styles";
import {
  Window,
  StyledWindowHeader,
  Header,
  PolicyContainer,
  BottomContainer,
} from "./PrivacyPolicyModal.styles";
import { Button, Checkbox } from "react95";
import { CloseIcon } from "components/react95";
import { PrivacyPolicyContext } from "contexts/PrivacyPolicy";
import { PrivacyPolicyBody } from "../PrivacyPolicyBody/PrivacyPolicyBody";
import { useHasReadPolicy } from "./hooks/useHasReadPolicy";
import { useWeb3Modal } from "contexts/Web3";

export const PrivacyPolicyModal = ({ modalVisible, setModalVisible }) => {
  const containerNode = useRef<HTMLDivElement | null>(null);
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { account } = useWeb3Modal();

  const { setHasAccepted } = useContext(PrivacyPolicyContext);

  const hasReadPolicy = useHasReadPolicy(modalVisible);

  // Handler functions
  const onContinue = async () => {
    setSubmitting(true);
    try {
      await fetch(
        "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/check/privacyPolicy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: account }), // sanitize
        }
      );
    } catch (e) {
      console.log("Failed to update privacy policy check");
    }
    setSubmitting(false);
    setHasAccepted(true);
  };

  return modalVisible ? (
    <Container onClick={() => setModalVisible(false)}>
      <Window onClick={(e) => e.stopPropagation()}>
        <StyledWindowHeader>
          <span>Privacy Policy</span>
          <Button onClick={() => setModalVisible(false)}>
            <CloseIcon />
          </Button>
        </StyledWindowHeader>
        <PolicyContainer id="privacy-policy-container" ref={containerNode}>
          <Header>Privacy Policy</Header>
          <PrivacyPolicyBody />
        </PolicyContainer>
        <BottomContainer>
          {hasReadPolicy ? (
            <>
              <Checkbox
                label="I have read and accept the Privacy Policy"
                checked={isBoxChecked}
                onClick={() => setIsBoxChecked(!isBoxChecked)}
              />
              <Button onClick={onContinue} disabled={!isBoxChecked || submitting}>
                Continue
              </Button>
            </>
          ) : (
            <p>Scroll down</p>
          )}
        </BottomContainer>
      </Window>
    </Container>
  ) : null;
};
