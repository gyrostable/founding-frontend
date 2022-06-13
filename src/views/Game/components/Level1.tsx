import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { useEffect, useState } from "react";
import { WindowContent, Fieldset, Checkbox } from "react95";

const Level1 = () => {
  const { gyro } = useWeb3Modal();
  const [mintDone, setMintDone] = useState(false);
  const [sammAddLiqDone, setSammAddLiqDone] = useState(false);

  const id = (v: any) => v;
  const level1 = [mintDone, sammAddLiqDone];
  const level1AllDone = level1.every(id);
  const level1AnyDone = level1.some(id);

  useEffect(() => {
    if (!gyro) return;
    gyro.hasMintedGyro().then(setMintDone);
    gyro.hasProvidedGydToSamm().then(setSammAddLiqDone);
  }, [gyro]);

  return (
    <WindowContent>
      To complete level 1, you need to mint Gyro dollars using Gyro's Primary Market AMM (through
      this website) and provide liquidity to Gyro's Secondary Market AMM (through Balancer's UI).
      See&nbsp;
      <a
        href="https://medium.com/gyroscope-protocol/gyrosoft-all-weather-simulator-first-level-out-now-14ed8d120c30"
        target="_blank"
        rel="noreferrer"
      >
        <u>the level 1 post</u>
      </a>
      &nbsp;for instructions.
      <Fieldset label="Progress" style={{ pointerEvents: "none" }}>
        <Checkbox
          label="Completed"
          indeterminate={!level1AllDone && level1AnyDone}
          checked={level1AllDone}
        />
        <div style={{ paddingLeft: "1.5rem" }}>
          <Checkbox checked={mintDone} label="Mint Gyro Dollars using the P-AMM" />
          <br />
          <Checkbox checked={sammAddLiqDone} label="Add liquidity to the S-AMM" />
        </div>
      </Fieldset>
    </WindowContent>
  );
};

export default Level1;
