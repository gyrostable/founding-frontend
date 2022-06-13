import { useEffect } from "react";
import { PrivacyPolicyBody } from "views/Game/components/PrivacyPolicy/components/PrivacyPolicyBody/PrivacyPolicyBody";
import { Body } from "./PrivacyPolicy.styles";

export const PrivacyPolicy = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Body>
      <h1>Privacy Policy</h1>
      <PrivacyPolicyBody />
    </Body>
  );
};
