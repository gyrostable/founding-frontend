import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { ethers } from "ethers";
import { MouseEvent, useCallback, useEffect, useState, useContext, useRef } from "react";
import { WindowContent, Fieldset, Checkbox, Button } from "react95";

import { GyroStore, GyroStore__factory as GyroStoreFactory } from "nft-typechain";
import { ArbitrageStatus, ERC20__factory as ERC20Factory } from "@gyrostable/core";
import { ArbitrageStatus__factory as ArbitrageStatusFactory } from "@gyrostable/core";
import { BigNumber } from "@ethersproject/bignumber";
import useBalances from "contexts/Balances/useBalances";
import styled from "styled-components";
import classnames from "classnames";
import loop from "loop.gif";
import TransactionPopUp from "./TransactionPopUp";
import { useNotifications } from "contexts/Notifications";
import { SpectatorModeContext } from "../../../../contexts/SpectatorMode";

type Transactions = {
  transactionHash1: string;
  transactionHash2: string;
};

const gyroStoreAddress = "0xe870dbF309100C3f6ab765A5c0B25bec01B6B320";
const gyroERC20Address = "0xd0474aeba181987a81352842d446fc6c65481417";
// const gyroNFTAddress = "0x7AE06DfEE00fC92020264023E9041751dbe2144A"; // <- get NFT data straight from purchase emit
const arbitrageStatusAddress = "0x4Ac61ff8EEca99d67f434e60dacf638F546E4cBD";

const getMintedNFTs = async (gyroStore, account, setNFTs, setBoughtNFT) => {
  const filter = gyroStore.filters.BuyGyroNFT(account, null);
  const events = await gyroStore.queryFilter(filter);

  const formatted = events.map((e) => ({
    tokenUri: e.args.tokenUri,
    tokenId: e.args.tokenId,
    price: e.args.price,
  }));

  setNFTs(formatted);
  if (formatted.length > 0) {
    setBoughtNFT(true);
  }
};

const approveGYDTransfer = async (signer, account, setApproved, currentNFTPrice) => {
  const erc20GYD = ERC20Factory.connect(gyroERC20Address, signer);
  const currentAllowance = await erc20GYD.allowance(account, gyroStoreAddress);

  if (currentAllowance.lt(currentNFTPrice)) {
    // just to avoid "front-run"
    const amountToApprove = currentNFTPrice.mul(2);
    return await erc20GYD.approve(gyroStoreAddress, amountToApprove);
  } else {
    setApproved(true); // Sufficient balance
  }
};

const errorColor = "#ff0000";
const ErrorMessage = styled.span<{ error?: boolean }>`
  color: ${errorColor};
  display: ${({ error }) => (error ? "" : "none")};
  margin-left: 0.5rem;
`;

const successColor = "#8db0fc";
const SuccessMessage = styled.span<{ show?: boolean }>`
  color: ${successColor};
  display: ${({ show }) => (show ? "" : "none")};
  margin-left: 0.5rem;
`;

const LoopGIF = <img src={loop} alt="loading..." />;

const Level2 = () => {
  const { provider, account: web3Account, gyro } = useWeb3Modal();
  const { isSpectatorMode, spectatorAccount } = useContext(SpectatorModeContext);
  const account = isSpectatorMode ? spectatorAccount : web3Account;
  const currentAccount = useRef(account);
  const { gyroBalance } = useBalances();
  const [arbDone, setArbDone] = useState<boolean>(false);
  const [boughtNFT, setBoughtNFT] = useState<boolean>(false);
  const [buyingNFT, setBuyingNFT] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(true);
  const [NFTs, setNFTs] = useState([]);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [currentNFTPrice, setCurrentNFTPrice] = useState<BigNumber>(BigNumber.from(0));
  const [arbitrageFailed, setArbitrageFailed] = useState(false);
  const [verifyingArbitrage, setVerifyingArbitrage] = useState(false);

  const { updateNotification } = useNotifications();

  const id = (v: any) => v;
  const level2 = [arbDone, boughtNFT];
  const level2AllDone = level2.every(id);
  const level2AnyDone = level2.some(id);

  const fetchNFTPricing = useCallback(
    async (signer: any, gyroStore: GyroStore) => {
      const erc20GYD = ERC20Factory.connect(gyroERC20Address, signer);
      const newVal = await gyroStore.purchasePrice();
      setCurrentNFTPrice(newVal);
      const currentAllowance = await erc20GYD.allowance(account, gyroStoreAddress);
      setApproved(currentAllowance.gte(newVal));
    },
    [setApproved, setCurrentNFTPrice, account]
  );

  const approve = async () => {
    if (!provider || !account) return;
    const signer = provider.getSigner(account);
    const tx = await approveGYDTransfer(signer, account, setApproved, currentNFTPrice);
    const receipt = await tx.wait();
    const gyroStore = GyroStoreFactory.connect(gyroStoreAddress, signer);
    if (receipt.status === 1) {
      fetchNFTPricing(signer, gyroStore);
    }
  };

  const buyNFT = async () => {
    if (!provider || !account || !approved) return;

    const signer = provider.getSigner(account);
    const gyroStore = GyroStoreFactory.connect(gyroStoreAddress, signer);

    updateNotification({
      message: "Get Ready 2",
      child: LoopGIF,
      title: "Update",
    });

    try {
      setBuyingNFT(true);
      const tx = await gyroStore.buyGyroNFT();

      const receipt = await tx.wait();
      setBuyingNFT(false);
      if (receipt.status === 1) {
        getMintedNFTs(gyroStore, account, setNFTs, setBoughtNFT);
      }
    } catch (e) {
      updateNotification({
        message: "",
        title: "Error",
        copy: JSON.stringify(e),
      });
      setBuyingNFT(false);
    }
  };

  const price = currentNFTPrice.div(BigNumber.from(10).pow(18)).toNumber();
  const sufficientBalance = gyroBalance && gyroBalance.toNormalizedNumber() >= price;

  const ApproveButton = () => (
    <Button
      className={classnames({ dNone: approved || !sufficientBalance || !account })}
      disabled={!account || !arbDone}
      onClick={approve}
    >
      {approved ? "GYD Approved" : "Approve GYD"}
    </Button>
  );

  const BuyNFTButton = () => {
    return (
      <Button
        className={classnames({ dNone: !approved })}
        disabled={!approved || !account || !sufficientBalance || buyingNFT || !arbDone}
        onClick={buyNFT}
      >
        Buy NFT - {price} GYD {!sufficientBalance ? "(insufficient balance)" : null}
      </Button>
    );
  };

  useEffect(() => {
    if (!account) return;
    if (currentAccount.current !== account) {
      setNFTs([]);
      setBoughtNFT(false);
      setArbDone(false);
      setVerifyingArbitrage(false);
      currentAccount.current = account;
    }
    const currentProvider = provider || new ethers.providers.Web3Provider(window.ethereum);
    const gyroStore = GyroStoreFactory.connect(gyroStoreAddress, currentProvider);
    const arbitrageStatus = ArbitrageStatusFactory.connect(arbitrageStatusAddress, currentProvider);

    getMintedNFTs(gyroStore, account, setNFTs, setBoughtNFT);

    const establishArbStatus = async (arbitrageStatus: ArbitrageStatus) => {
      const user = await arbitrageStatus.users(account);
      setArbDone(user.completed);
      setVerifyingArbitrage(user.waitingForCheck);
    };

    fetchNFTPricing(currentProvider, gyroStore);
    establishArbStatus(arbitrageStatus);
  }, [provider, account, fetchNFTPricing]);

  const openModal = (_e: MouseEvent<HTMLElement>) => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const onSubmitHashes = async ({ transactionHash1, transactionHash2 }: Transactions) => {
    const success = await gyro.verifyArbitrage(transactionHash1, transactionHash2);
    setArbitrageFailed(!success);
    setVerifyingArbitrage(success);
    if (!success) {
      return;
    }
    const signer = provider.getSigner(account);
    const arbitrageStatus = ArbitrageStatusFactory.connect(arbitrageStatusAddress, signer);
    try {
      const tx = await arbitrageStatus.setTransactions(transactionHash1, transactionHash2);
      updateNotification({
        title: "Notification",
        child: <p>Verification in progress, please reload once tx finalized</p>,
      });
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        setVerifyingArbitrage(false);
        updateNotification({
          message: "Transaction failed, please try again",
          title: "Error",
        });
      }
    } catch (e) {
      setVerifyingArbitrage(false);
      updateNotification({
        message: "Please select copy for more details",
        title: "Error",
        copy: JSON.stringify(e),
      });
    }
  };

  return (
    <WindowContent>
      To complete level 2, generate arbitrage profit in GYD and buy an NFT with it. See&nbsp;
      <a
        href="https://medium.com/gyroscope-protocol/gyrosoft-all-weather-simulator-level-2-gyrobatics-4c5316077f47"
        target="_blank"
        rel="noreferrer"
      >
        <u>the level 2 post</u>
      </a>
      &nbsp;for instructions.
      <Fieldset label="Progress">
        <Checkbox
          label="Completed"
          indeterminate={!level2AllDone && level2AnyDone}
          checked={level2AllDone}
        />
        <div style={{ paddingLeft: "1.5rem" }}>
          <Checkbox checked={arbDone} label="Performed arbitrage between S-AMM and P-AMM" />
          <div style={{ paddingLeft: "1.5rem" }}>
            <TransactionPopUp
              show={modalOpened}
              closeModal={closeModal}
              onSubmit={onSubmitHashes}
            />
            <Button
              onClick={openModal}
              className={classnames({ dNone: arbDone })}
              disabled={verifyingArbitrage}
            >
              Verify Arbitrage
            </Button>
            <ErrorMessage error={arbitrageFailed}>
              Could not verify arbitrage. Please double-check the transaction hashes and make sure
              the transactions were profitable in terms of USDC.
            </ErrorMessage>
            <SuccessMessage show={verifyingArbitrage}>
              Your arbitrage transactions are currently being verified. Please check again in a few
              minutes...
            </SuccessMessage>
          </div>
          <Checkbox checked={boughtNFT} label="NFT bought from the store" />
          <div style={{ paddingLeft: "1.5rem" }}>
            <p>(Current NFT price: {price} GYD)</p>
          </div>
          <div style={{ paddingLeft: "1.5rem" }}>
            {NFTs.length > 0 ? (
              <div>
                <p>Are you ready?</p>
                {NFTs.map((nft, i) => (
                  <div key={i}>
                    <img src={nft.tokenUri} alt="NFT asset" width="300px" />
                    <p>Price: {nft.price.div(BigNumber.from(10).pow(18)).toNumber()} GYD</p>
                    <p>Id: {nft.tokenId.toNumber()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <ApproveButton />
                <BuyNFTButton />
              </div>
            )}
          </div>
        </div>
      </Fieldset>
    </WindowContent>
  );
};

export default Level2;
