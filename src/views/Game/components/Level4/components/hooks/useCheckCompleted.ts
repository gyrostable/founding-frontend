import { SetStateAction, useEffect, Dispatch, useContext, useRef } from "react";
import { ethers } from "ethers";
import { useWeb3Modal } from "contexts/Web3";
import { SybilCheck__factory, SybilCheck, deployment } from "@gyrostable/core";
import { SpectatorModeContext } from "contexts/SpectatorMode";

export const useCheckCompleted = (
  checkName: string,
  setIsChallengePass: Dispatch<SetStateAction<boolean>>,
  setCheckValue?: Dispatch<SetStateAction<any>>
) => {
  const { account: web3Account, provider } = useWeb3Modal();
  const { isSpectatorMode, spectatorAccount } = useContext(SpectatorModeContext);

  const account = isSpectatorMode ? spectatorAccount : web3Account;
  const currentAccount = useRef(account);

  useEffect(() => {
    const currentProvider = provider || new ethers.providers.Web3Provider(window.ethereum);

    if (currentAccount.current !== account) {
      // If account has changed, reset pass and value
      if (setIsChallengePass) setIsChallengePass(false);
      if (setCheckValue) setCheckValue(null);

      currentAccount.current = account;
    }

    const sybilCheck = SybilCheck__factory.connect(
      deployment.networks.kovan.SybilCheckProxy,
      currentProvider
    );

    if (account) {
      if (setIsChallengePass) {
        checkCompletedCheck(sybilCheck, account, checkName, setIsChallengePass);
      }

      if (setCheckValue) {
        retrieveCheckValue(sybilCheck, account, checkName, setCheckValue);
      }
    }
  }, [account, provider, setIsChallengePass, checkName, setCheckValue]);
};

const checkCompletedCheck = async (
  sybilCheck: SybilCheck,
  account: string,
  checkName: string,
  setValid: (v: boolean) => void
) => {
  const checkNameB32 = ethers.utils.formatBytes32String(checkName);
  const result = await sybilCheck.didCompleteCheck(account, checkNameB32);
  if (result) {
    setValid(result);
  }
};

const retrieveCheckValue = async (
  sybilCheck: SybilCheck,
  account: string,
  checkName: string,
  setCheckValue
) => {
  const checkNameB32 = ethers.utils.formatBytes32String(checkName);
  const checkValue = await sybilCheck.getCheckValue(account, checkNameB32);
  setCheckValue(checkValue);
};
