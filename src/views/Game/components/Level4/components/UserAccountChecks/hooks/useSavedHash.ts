import { useState } from "react";
import { Identification__factory as IdentificationFactory } from "@gyrostable/core";
import { useWeb3Modal } from "contexts/Web3";

const contractAddr = "0x028437cF5dB90B367e392Ee971639824684D8295";

export const useSavedHash = () => {
  const [savedHash, setSavedHash] = useState<string | null>(null);
  const { provider, account } = useWeb3Modal();

  if (!provider || !account) return savedHash;

  const signer = provider.getSigner(account);
  const identification = IdentificationFactory.connect(contractAddr, signer);

  (async function () {
    const hasRegistered = await identification.registrations(account);
    setSavedHash(hasRegistered[0]);
  })();

  return savedHash;
};
