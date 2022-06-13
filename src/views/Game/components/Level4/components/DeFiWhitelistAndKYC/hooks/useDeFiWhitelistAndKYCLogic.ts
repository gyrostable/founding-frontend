import { useState } from "react";
import { useNotifications } from "contexts/Notifications";

export const useDeFiWhitelistAndKYCLogic = (setGoldfinchPass) => {
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { updateNotification } = useNotifications();

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    console.log(input);
    try {
      const [res1, res2] = await Promise.all(
        ["goldfinchKYC", "megaWhitelist"].map((checkName) =>
          fetch(
            "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/check/" + checkName,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(JSON.parse(input)), // sanitize
            }
          )
        )
      );
      setSubmitting(false);
      setGoldfinchPass(res1.status === 200);
      if (res1.status !== 200 || res2.status !== 200) {
        const [goldFinchBody, megaWhitelistBody] = await Promise.all([res1.json(), res2.json()]);

        console.log("verification failed");
        updateNotification({
          message: [
            goldFinchBody.error
              ? "Goldfinch KYC Verification Error: " + goldFinchBody.error + "."
              : "Goldfinch KYC Passed.",

            megaWhitelistBody.error
              ? "DeFi Whitelist Verification Error - " + megaWhitelistBody.error
              : "DeFi Whitelist points awarded.",
          ],
          title: "Error",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      setSubmitting(false);
      updateNotification({
        message: `Verification failed: ${e + ". Check your input"}`,
        title: "Error",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    input,
    setInput,
    submitting,
    submit,
  };
};
