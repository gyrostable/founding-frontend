import { useChallengeState } from "../../hooks/useChallengeState";
import { useCheckCompleted } from "../../hooks/useCheckCompleted";

export const useMoreOAuthsState = () => {
  // STACK EXCHANGE -----------------------------------
  const { isChallengePass: stackOvFl, setIsChallengePass: setStackOvFl } =
    useChallengeState("stackOvFl");
  useCheckCompleted("stackOvFl", setStackOvFl);

  // GITHUB FOLLOWERS -----------------------------------
  const { isChallengePass: githubFollowers, setIsChallengePass: setGithubFollowers } =
    useChallengeState("githubFollowers");
  useCheckCompleted("githubFollowers", setGithubFollowers);

  // TWITTER FOLLOWERS -----------------------------------
  const { isChallengePass: twitterFollowers, setIsChallengePass: setTwitterFollowers } =
    useChallengeState("twitterFollowers");
  useCheckCompleted("twitterFollowers", setTwitterFollowers);

  // LINKEDIN --------------------------------------------
  const { isChallengePass: linkedin, setIsChallengePass: setLinkedin } =
    useChallengeState("linkedin");
  useCheckCompleted("linkedin", setLinkedin);

  // REDDIT ----------------------------------------------
  const { isChallengePass: reddit, setIsChallengePass: setReddit } = useChallengeState("reddit");
  useCheckCompleted("reddit", setReddit);

  // IMGUR -----------------------------------------------
  const { isChallengePass: imgur, setIsChallengePass: setImgur } = useChallengeState("imgur");
  useCheckCompleted("imgur", setImgur);

  // COINBASE ---------------------------------------------
  const { isChallengePass: coinbase, setIsChallengePass: setCoinbase } =
    useChallengeState("coinbase");
  useCheckCompleted("coinbase", setCoinbase);

  // DISCORD ----------------------------------------------
  const { isChallengePass: discord, setIsChallengePass: setDiscord } = useChallengeState("discord");
  useCheckCompleted("discord", setDiscord);

  // MINECRAFT ----------------------------------------------
  const { isChallengePass: minecraft, setIsChallengePass: setMinecraft } =
    useChallengeState("minecraft");
  useCheckCompleted("minecraft", setMinecraft);

  const challengeState = {
    stackOvFl,
    githubFollowers,
    twitterFollowers,
    linkedin,
    reddit,
    imgur,
    coinbase,
    discord,
    minecraft,
  };

  const challengeSetters = {
    stackOvFl: setStackOvFl,
    githubFollowers: setGithubFollowers,
    twitterFollowers: setTwitterFollowers,
    linkedin: setLinkedin,
    reddit: setReddit,
    imgur: setImgur,
    coinbase: setCoinbase,
    discord: setDiscord,
    minecraft: setMinecraft,
  };

  return [challengeState, challengeSetters];
};
