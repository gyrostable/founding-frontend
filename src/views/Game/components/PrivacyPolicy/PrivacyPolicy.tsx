import { useState } from "react";

import { WarningText, Container, OpenModalText, Overlay } from "./PrivacyPolicy.styles";
import { PrivacyPolicyModal } from "./components/PrivacyPolicyModal/PrivacyPolicyModal";

export const PrivacyPolicy = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <PrivacyPolicyModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Container>
        <WarningText>
          You have not accepted the privacy policy. You will not be able to continue the game
          without accepting the privacy policy. Click{" "}
          <OpenModalText onClick={() => setModalVisible(true)}>here</OpenModalText> to accept the
          policy.
        </WarningText>
      </Container>
      <Overlay />
    </>
  );
};
