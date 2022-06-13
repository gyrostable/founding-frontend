import { useState } from "react";
import { useNotifications } from "contexts/Notifications";
import { BigNumber } from "@ethersproject/bignumber";

export const useChallengeState = (checkName: string) => {
  const [isChallengePass, setIsChallengePass] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [checkValue, setCheckValue] = useState<{ done: boolean; metadata: BigNumber } | null>(null);

  const { updateNotification } = useNotifications();

  // Handler functions
  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    console.log(input);
    try {
      const res = await fetch(
        "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/check/" + checkName,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JSON.parse(input)), // sanitize
        }
      );
      const body = await res.json();
      setSubmitting(false);
      setIsChallengePass(res.status === 200);
      if (res.status !== 200) {
        console.log("verification failed");
        updateNotification({
          message: `Verification failed: ${body.error}`,
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
    isChallengePass,
    setIsChallengePass,
    submitting,
    setSubmitting,
    input,
    setInput,
    submit,
    checkValue,
    setCheckValue,
  };
};
