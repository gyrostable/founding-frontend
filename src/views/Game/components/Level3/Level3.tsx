import { WindowContent, Fieldset, Checkbox } from "react95";
import { useEffect, useState, useContext, useRef } from "react";

import { useWeb3Modal } from "contexts/Web3";
import { checkVotes } from "./utils/checkVotes";
import { SpectatorModeContext } from "contexts/SpectatorMode";

// Testing data
// account = 0x96176C25803Ce4cF046aa74895646D8514Ea1611
// snapshotProposalId = "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj";

const Level3 = () => {
  const [_error, setError] = useState<string>();
  const [voted, setVoted] = useState<boolean>(false);
  const { account: web3Account } = useWeb3Modal();
  const { isSpectatorMode, spectatorAccount } = useContext(SpectatorModeContext);
  const account = isSpectatorMode ? spectatorAccount : web3Account;
  const currentAccount = useRef(account);

  useEffect(() => {
    try {
      if (currentAccount.current !== account) {
        setVoted(false);
        currentAccount.current = account;
      }

      if (account) {
        checkVotes(account, setError).then((newVoted) => setVoted(newVoted));
      }
    } catch (e) {
      console.log("ERROR:" + e);
      setError("ERROR:" + e);
    }
  }, [account]);

  return (
    <WindowContent>
      Level 3 is about joining and bootstrapping the Gyroscope DAO. The community passed the first
      governance vote in{" "}
      <a
        href="https://medium.com/gyroscope-protocol/gyrosoft-all-weather-simulator-level-3-governance-take-off-ebf9e7aa576d"
        target="_blank"
        rel="noreferrer"
      >
        <u>Wave 1 of Level 3</u>
      </a>
      . Wave 2 offers newcomers an option to still join the DAO. To join the DAO follow this
      description:&nbsp;
      <a
        href="https://medium.com/gyroscope-protocol/gyrosoft-all-weather-simulator-level-3-governance-take-off-ebf9e7aa576d"
        target="_blank"
        rel="noreferrer"
      >
        <u>link</u>
      </a>
      . Refresh the page after voting.
      <li>1. Understand the governance mechanism</li>
      <li>2. Get ready to participate in later governance decisions</li>
      <li>3. Vote on Snapshot</li>
      <Fieldset label="Progress">
        <Checkbox label="Voted on Snapshot" checked={voted} />
      </Fieldset>
    </WindowContent>
  );
};

export default Level3;
