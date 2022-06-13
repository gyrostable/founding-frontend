import { useState, useCallback } from "react";
import Context, { eligibilityStatusType, claimStatusType } from "./Context";
import nftEligibleList from "../../static/nftEligibleList.json";

const PROGRESS_BAR_LOAD_TIME = 10000;

const Provider = ({ children }) => {
  const [eligibilityStatus, setEligbilityStatus] =
    useState<eligibilityStatusType>("awaiting eligibility");

  const [claimStatus, setClaimStatus] = useState<claimStatusType>("unclaimed");

  const [claimProgress, setClaimProgress] = useState(0);

  const findNFTStatus = useCallback(async (account: string) => {
    // Check cache
    if (localStorage.getItem(`nft-eligibility-${account.toLowerCase()}`) === "eligible")
      return setEligbilityStatus("eligible");
    if (localStorage.getItem(`nft-eligibility-${account.toLowerCase()}`) === "not eligible")
      return setEligbilityStatus("not eligible");
    if (localStorage.getItem(`nft-eligibility-${account.toLowerCase()}`) === "claimed")
      return setClaimStatus("claimed");

    setEligbilityStatus("awaiting eligibility");

    setTimeout(() => {
      if (nftEligibleList.includes(account.toLowerCase())) {
        setEligbilityStatus("eligible");
        setClaimStatus("unclaimed");
        localStorage.setItem(`nft-eligibility-${account.toLowerCase()}`, "eligible");
      } else {
        setEligbilityStatus("not eligible");
      }
    }, 3000);
  }, []);

  const resetNFTStatus = useCallback(() => {
    setClaimStatus("unclaimed");
    setClaimProgress(0);
    setEligbilityStatus("awaiting eligibility");
  }, []);

  async function claimNFTEgg(account: string) {
    setClaimStatus("claiming");

    const randomSampleSize = Math.ceil(Math.random() * 5) + 5;

    const randomProgress = Array.from(Array(randomSampleSize))
      .map(() => Math.floor(Math.random() * 100))
      .sort((a, b) => (a < b ? -1 : 1));

    randomProgress.push(100);

    const randomTimes = Array.from(Array(randomSampleSize + 1))
      .map(() => Math.floor(Math.random() * PROGRESS_BAR_LOAD_TIME))
      .sort((a, b) => (a < b ? -1 : 1));

    randomTimes.forEach((time, index) => {
      setTimeout(() => {
        setClaimProgress(randomProgress[index]);
      }, time);
    });

    setTimeout(() => {
      setClaimStatus("claimed");
      localStorage.setItem(`nft-eligibility-${account.toLowerCase()}`, "claimed");
    }, PROGRESS_BAR_LOAD_TIME);
  }

  return (
    <Context.Provider
      value={{
        eligibilityStatus,
        claimStatus,
        findNFTStatus,
        claimNFTEgg,
        claimProgress,
        resetNFTStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
