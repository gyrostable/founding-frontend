import { createContext } from "react";

export type eligibilityStatusType = "eligible" | "not eligible" | "awaiting eligibility";

export type claimStatusType = "claimed" | "unclaimed" | "claiming";

interface NFTProps {
  eligibilityStatus: eligibilityStatusType;
  findNFTStatus: (account: string) => Promise<void>;
  claimStatus: claimStatusType;
  claimNFTEgg: (account: string) => Promise<void>;
  claimProgress: number;
  resetNFTStatus: () => void;
}

const Context = createContext<NFTProps>({
  eligibilityStatus: "awaiting eligibility",
  claimStatus: "unclaimed",
  findNFTStatus: async () => {},
  claimNFTEgg: async () => {},
  claimProgress: 0,
  resetNFTStatus: () => {},
});

export default Context;
