import { useLocation } from "react-router-dom";
import { useWeb3Modal } from "contexts/Web3";
import { useEffect, useRef } from "react";

import { useChallengeState } from "../../../../hooks/useChallengeState";
import { useCheckCompleted } from "../../../../hooks/useCheckCompleted";
import { useNotifications } from "contexts/Notifications";

export const useQuery = (json, checkName) => {
  const { account } = useWeb3Modal();
  const query = useRef(new URLSearchParams(useLocation().search));
  const githubToken = query.current.get("github_token");
  const twitterToken = query.current.get("oauth_token");
  const followerCheck = query.current.get("follower_check");

  const { input, setInput, setIsChallengePass, isChallengePass } = useChallengeState(checkName);
  useCheckCompleted(checkName, setIsChallengePass, null);
  useCheckCompleted(checkName + "-standardised", setIsChallengePass, null);
  const { updateNotification } = useNotifications();
  const staticUpdateNotification = useRef(updateNotification);

  useEffect(() => {
    if (githubToken && account && json && checkName === "github") {
      setInput(JSON.stringify({ address: account, githubToken, json }));
    }
    if (twitterToken && account && json && checkName === "twitter" && !Boolean(followerCheck)) {
      setInput(
        JSON.stringify({
          address: account,
          oauth_token: twitterToken,
          json,
          oauth_token_secret: query.current.get("oauth_token_secret"),
          user_id: query.current.get("user_id"),
        })
      );
    }
  }, [account, githubToken, twitterToken, followerCheck, query, checkName, setInput, json]);

  useEffect(() => {
    if (input) {
      staticUpdateNotification.current({
        message: `We are verifying your account! Give us a moment.`,
        title: "Verfying",
      });
      (async () => {
        try {
          const res = await fetch(
            "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/check/" + checkName,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: input,
            }
          );
          const body = await res.json();

          if (res.status === 200) {
            staticUpdateNotification.current({
              message: `${checkName[0].toUpperCase()}${checkName.slice(1)} Verification Success`,
              title: "Verified",
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            console.log("verification failed");
            staticUpdateNotification.current({
              message: `Verification failed: ${body.error}. ${
                body.error.includes("value already used")
                  ? "If you have already completed verification, reload the page to test.gyro.finance/game"
                  : ""
              }`,
              title: "Error",
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } catch (e) {
          staticUpdateNotification.current({
            message: `Verification failed: ${e + ". Check your input"}`,
            title: "Error",
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })();
    }
  }, [input, staticUpdateNotification, checkName]);

  return isChallengePass;
};
