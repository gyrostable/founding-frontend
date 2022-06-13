import { useContext, useEffect, useState } from "react";
import { Button, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";

import useBalances from "contexts/Balances/useBalances";
import { numberWithCommas } from "helpers";
import { MonetaryAmount } from "@gyrostable/sdk";
import { CloseIcon, StyledWindow } from "components/react95";
import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const SystemStatus = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const [visibility, setVisibility] = useState<boolean>(!!hidden);
  const { gyroTotalSupply, reserveValues } = useBalances();
  const { account } = useWeb3Modal();
  const { isSpectatorMode } = useContext(SpectatorModeContext);

  // useEffect(() => {
  //   setVisibility(!!hidden);
  // }, [hidden]);

  useEffect(() => {
    setIsExpanded(!!account);
  }, [account]);

  const totalUSDReserve = reserveValues.reduce((agg, reserve) => {
    // MonetaryAmount should add an `add()` function
    return agg + reserve.amount.toNormalizedNumber();
  }, 0);

  const collateralizationRatio =
    gyroTotalSupply && ((totalUSDReserve / gyroTotalSupply.toNormalizedNumber()) * 100).toFixed(2);

  const healthLevel = (collateralizationRatio) => {
    if (collateralizationRatio > 80) {
      return "Healthy";
    } else if (collateralizationRatio > 50) {
      return "Wanning";
    }
  };

  return (
    <Wrapper isSpectatorMode={isSpectatorMode} hidden={false /*!visibility*/}>
      <Window>
        <StyledWindowHeader active={isExpanded}>
          <span>SystemStatus.exe</span>
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <CloseIcon /> : ""}
          </Button>
        </StyledWindowHeader>
        {isExpanded ? (
          <StyledWindowContent>
            <div>Circulation:</div>
            <div>{format(gyroTotalSupply)} GYD </div>
            <div>Collateralization Ratio:</div>
            <div>{collateralizationRatio}%</div>
            <div>System Health:</div>
            <div>{healthLevel(collateralizationRatio)}</div>
          </StyledWindowContent>
        ) : (
          ""
        )}
      </Window>
    </Wrapper>
  );
};

const format = (value: MonetaryAmount) => value && numberWithCommas(value.toNormalizedString());

const width = "200px";

// If mobile, collapse and insert between Title and MintRedeem component
const Wrapper = styled.div<{ isSpectatorMode: boolean }>`
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  position: absolute;
  top: ${({ isSpectatorMode }) => (isSpectatorMode ? "175px" : "72px")};
  right: 20px;
  z-index: 50;
`;

const StyledWindowContent = styled(WindowContent)``;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Window = styled(StyledWindow)`
  width: ${width};
  // min-height: 200px;
`;

export default SystemStatus;
