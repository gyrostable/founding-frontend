import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Body, H3 } from "components/Misc";
import { useWeb3Modal } from "contexts/Web3";
import { NFTContext } from "contexts/NFT";
import ClaimLoadingBar from "./components/ClaimLoadingBar";
import FrogEgg from "./components/FrogEgg";

const ClaimNFT = () => {
  const { provider, account } = useWeb3Modal();
  const prevAccount = useRef("");
  const {
    eligibilityStatus,
    findNFTStatus,
    claimStatus,
    claimNFTEgg,
    claimProgress,
    resetNFTStatus,
  } = useContext(NFTContext);

  useEffect(() => {
    if (provider && account) {
      findNFTStatus(account);
    } else {
      resetNFTStatus();
    }
  }, [account, provider, findNFTStatus, resetNFTStatus]);

  useEffect(() => {
    if (account && prevAccount.current && account !== prevAccount.current) {
      resetNFTStatus();
    }
    prevAccount.current = account;
  }, [account, resetNFTStatus]);

  function renderText(account, eligibilityStatus, claimStatus) {
    if (!account) return "Please connect your wallet";

    const eligibilityMessage = {
      "awaiting eligibility": "Counting your sybil points, please wait...",
      eligible: "You have been chosen to become a Founding Frogger of Gyroscope 🥳",
      "not eligible":
        "Unfortunately, you have not got the required sybil points to qualify for an NFT 😞",
    }[eligibilityStatus];

    return {
      unclaimed: eligibilityMessage,
      claiming: "Laying your frog egg, please wait...",
    }[claimStatus];
  }

  return (
    <>
      <Body>
        {
          {
            unclaimed: (
              <ClaimButton
                onClick={() => claimNFTEgg(account)}
                disabled={!(account && eligibilityStatus === "eligible")}
              >
                Claim your Gyro Frog NFT
              </ClaimButton>
            ),
            claiming: <ClaimLoadingBar progress={claimProgress} />,
            claimed: <FrogEgg account={account} />,
          }[claimStatus]
        }

        <H3>{renderText(account, eligibilityStatus, claimStatus)}</H3>
      </Body>
    </>
  );
};

const ClaimButton = styled.button`
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  flex-shrink: 0;
  font-family: Eina01, sans-serif;
  font-size: 24px;
  font-weight: 800;
  justify-content: center;
  line-height: 24px;
  margin: 0;
  min-height: 64px;
  outline: none;
  overflow: visible;
  padding: 19px 26px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: auto;
  word-break: keep-all;
  z-index: 0;

  @media (min-width: 768px) {
    & {
      padding: 19px 32px;
    }
  }

  &:before,
  &:after {
    border-radius: 80px;
  }

  &:before {
    background-color: rgba(249, 58, 19, 0.32);
    content: "";
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  &:after {
    background-color: initial;
    background-image: linear-gradient(92.83deg, #fcba03 0, #ff9900 100%);
    bottom: 4px;
    content: "";
    display: block;
    left: 4px;
    overflow: hidden;
    position: absolute;
    right: 4px;
    top: 4px;
    transition: all 100ms ease-out;
    z-index: -1;
  }

  &:hover:not(:disabled):after {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transition-timing-function: ease-in;
  }

  &:active:not(:disabled) {
    color: #ccc;
  }

  &:active:not(:disabled):after {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(92.83deg, #fcba03 0, #ff9900, 100%);
    bottom: 4px;
    left: 4px;
    right: 4px;
    top: 4px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.24;
  }
`;
export default ClaimNFT;
