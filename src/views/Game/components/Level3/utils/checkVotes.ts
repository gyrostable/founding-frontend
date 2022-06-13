import { Dispatch, SetStateAction } from "react";
import { snapshotClient, fetchVoted } from "../queries";

const SNAPSHOT_PROPOSAL_ID_1 = "QmeMYwoCCEhSk8E7BNshU2XeSD91RVdLrkkv3mSV2EApTe";
const SNAPSHOT_PROPOSAL_ID_2 = "0xcf5abf619680f041f9f1de44765ef4499365718eb77d37e0a419f9f995e9801e";

const proposals = [SNAPSHOT_PROPOSAL_ID_1, SNAPSHOT_PROPOSAL_ID_2];

export const checkVotes = async (
  account: string,
  setError: Dispatch<SetStateAction<string>>
): Promise<boolean> => {
  const votedArray = await Promise.all(
    proposals.map((proposal) => fetchVoted(snapshotClient, setError, proposal, account))
  );

  return votedArray.reduce((acc, el) => (el ? el : acc), false);
};
