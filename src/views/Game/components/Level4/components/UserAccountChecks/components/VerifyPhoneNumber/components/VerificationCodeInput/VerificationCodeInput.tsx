import { useState } from "react";
import { Button } from "react95";
import { useNotifications } from "contexts/Notifications";

import { Container, Input } from "./VerificationCodeInput.styles";

export const VerificationCodeInput = ({ account, phoneNumber, json }) => {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { updateNotification } = useNotifications();
  const [accepted, setAccepted] = useState(false);

  const submit = async () => {
    try {
      const body = {
        phoneNumber: phoneNumber,
        json: json,
        address: account,
        code,
      };

      setSubmitting(true);

      const res = await fetch(
        "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/auth/phone/code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body), // sanitize
        }
      );

      setSubmitting(false);

      if (res.status === 200) {
        setAccepted(true);
      } else {
        const resBody = await res.json();

        console.log("verification failed");
        updateNotification({
          message: `Verification failed: ${resBody.error}`,
          title: "Error",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      console.log(e);
      setSubmitting(false);

      updateNotification({
        message: `Verification failed: ${e}`,
        title: "Error",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Container>
        <p>Please enter your verification code </p>
        <Input value={code} type="text" onChange={(e) => setCode(e.target.value.trim())} />
      </Container>
      <div>
        <Button disabled={submitting || accepted} onClick={submit}>
          Submit
        </Button>
      </div>
      {accepted && <p>Your verification code has been accepted</p>}
    </>
  );
};
