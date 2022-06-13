import { useLocation } from "react-router-dom";
import { useWeb3Modal } from "contexts/Web3";
import { useEffect, useRef, useContext } from "react";
import { useNotifications } from "contexts/Notifications";
import { SpectatorModeContext } from "contexts/SpectatorMode";

export const useQuery = (challengeSetters) => {
  const query = useRef(new URLSearchParams(useLocation().search));
  const { account: web3Account } = useWeb3Modal();
  const { updateNotification } = useNotifications();
  const staticUpdateNotification = useRef(updateNotification);
  const staticChallengeSetters = useRef(challengeSetters);
  const { isSpectatorMode, spectatorAccount } = useContext(SpectatorModeContext);

  const account = isSpectatorMode ? spectatorAccount : web3Account;
  useEffect(() => {
    if (account) {
      const { relevantParams, checkName } = getRelevantParams(query.current, account);
      if (checkName) {
        staticUpdateNotification.current({
          message: `We are verifying your account! Give us a moment.`,
          title: "Verfying",
        });
        const setIsChallengePass = staticChallengeSetters.current[checkName];
        verifyAccount(checkName, relevantParams, staticUpdateNotification, setIsChallengePass);
      }
    }
  }, [account, staticChallengeSetters]);
};

async function verifyAccount(
  checkName,
  relevantParams,
  staticUpdateNotification,
  setIsChallengePass
) {
  try {
    const res = await fetch(
      "https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/check/" + checkName,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(relevantParams),
      }
    );
    const body = await res.json();

    if (res.status !== 200) throw new Error(body.error);

    staticUpdateNotification.current({
      message: `Verification Success`,
      title: "Verified",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsChallengePass(true);
  } catch (e) {
    staticUpdateNotification.current({
      message: `Verification failed: ${e.message}. ${
        e.message.includes("value already used")
          ? "If you have already completed verification, reload the page to test.gyro.finance/game"
          : ""
      }`,
      title: "Error",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getRelevantParams(query, account) {
  const [
    stackOvFlToken,
    githubFollowersToken,
    twitterFollowerCheck,
    twitterToken,
    twitterSecret,
    redditToken,
    imgurToken,
    coinbaseToken,
    discordToken,
    minecraftToken,
  ] = [
    "stack_ov_fl_token",
    "github_followers_token",
    "follower_check",
    "oauth_token",
    "oauth_token_secret",
    "reddit_token",
    "imgur_token",
    "coinbase_token",
    "discord_token",
    "minecraft_token",
  ].map((param) => query.get(param));

  if (stackOvFlToken)
    return { relevantParams: { stackOvFlToken, address: account }, checkName: "stackOvFl" };

  if (githubFollowersToken)
    return {
      relevantParams: { githubFollowersToken, address: account },
      checkName: "githubFollowers",
    };

  if (twitterFollowerCheck && twitterToken && twitterSecret)
    return {
      relevantParams: { twitterToken, twitterSecret, address: account },
      checkName: "twitterFollowers",
    };

  if (redditToken)
    return {
      relevantParams: { redditToken, address: account },
      checkName: "reddit",
    };

  if (imgurToken)
    return {
      relevantParams: { imgurToken, address: account },
      checkName: "imgur",
    };

  if (coinbaseToken)
    return {
      relevantParams: { coinbaseToken, address: account },
      checkName: "coinbase",
    };

  if (discordToken)
    return {
      relevantParams: { discordToken, address: account },
      checkName: "discord",
    };

  if (minecraftToken)
    return {
      relevantParams: { minecraftToken, address: account },
      checkName: "minecraft",
    };

  return { relevantParams: null, checkName: null };
}
