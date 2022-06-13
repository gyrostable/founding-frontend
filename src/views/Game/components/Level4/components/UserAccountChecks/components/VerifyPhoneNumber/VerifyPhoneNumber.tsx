import { Button } from "react95";
import { useState } from "react";
import { useNotifications } from "contexts/Notifications";
import { useWeb3Modal } from "contexts/Web3";

import { Container, Row } from "./VerifyPhoneNumber.styles";
import { CountryCodeSelect } from "./components/CountryCodeSelect/CountryCodeSelect";
import { VerificationCodeInput } from "./components/VerificationCodeInput/VerificationCodeInput";
import { VerifiedMessage } from "../../UserAccountChecks.styles";

export const VerifyPhoneNumber = ({ json, phonePass }) => {
  const [containerOpen, setContainerOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("44");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(json.phone);
  const [sendingSMS, setSendingSMS] = useState(false);
  const [smsSent, setSMSSent] = useState(false);

  const { updateNotification } = useNotifications();
  const { account } = useWeb3Modal();

  // Handlers
  const updatePhoneNumber = () => {
    if (
      updatedPhoneNumber[0] === "+" ||
      (updatedPhoneNumber[0] === "0" && updatedPhoneNumber[1] === "0")
    ) {
      updateNotification({
        message: `Your phone number does not require updating`,
        title: "Error",
      });
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const cleanedPhoneNumber =
      updatedPhoneNumber[0] === "0" ? updatedPhoneNumber.slice(1) : updatedPhoneNumber;

    setUpdatedPhoneNumber("+" + selectedCountryCode + cleanedPhoneNumber);
  };

  const sendUserSMS = async () => {
    try {
      const body = {
        phoneNumber: updatedPhoneNumber,
        json: json,
        address: account,
      };

      setSendingSMS(true);

      const res = await fetch(
        "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/auth/phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body), // sanitize
        }
      );

      setSendingSMS(false);

      if (res.status === 200) {
        setSMSSent(true);
      }
    } catch (e) {
      console.log(e);
      setSendingSMS(false);

      updateNotification({
        message: `Failed to connect to Gyroscope server`,
        title: "Error",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container>
      <div>
        <Button disabled={phonePass} onClick={() => setContainerOpen(true)}>
          Verify Phone number
        </Button>
        {phonePass && <VerifiedMessage>Verified</VerifiedMessage>}
      </div>

      {containerOpen && !phonePass && (
        <>
          <br />
          <p>Please update your phone number with the relevant country code if necessary</p>
          <br />
          <p>Your number:</p>
          <p>{updatedPhoneNumber}</p>
          <br />
          <Row>
            <CountryCodeSelect
              selectedCountryCode={selectedCountryCode}
              setSelectedCountryCode={setSelectedCountryCode}
            />
            <Button onClick={updatePhoneNumber}>Update</Button>
          </Row>
          <br />

          <div>
            <Button disabled={sendingSMS || smsSent} onClick={sendUserSMS}>
              Send SMS
            </Button>
            {smsSent && <p>SMS sent</p>}
          </div>

          {smsSent && (
            <VerificationCodeInput account={account} phoneNumber={updatedPhoneNumber} json={json} />
          )}

          <br />
        </>
      )}
    </Container>
  );
};
