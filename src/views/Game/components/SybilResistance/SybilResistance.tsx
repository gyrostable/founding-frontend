import { ethers } from "ethers";
import { useContext, useRef } from "react";
import { Identification__factory as IdentificationFactory } from "@gyrostable/core";
import { useNotifications } from "contexts/Notifications";
import { useWeb3Modal } from "contexts/Web3";
import { sha256 } from "js-sha256";
import loop from "loop.gif";
import { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Fieldset, WindowContent } from "react95";
import InputItem from "components/InputItem";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const LoopGIF = <img src={loop} alt="loading..." />;

const contractAddr = "0x028437cF5dB90B367e392Ee971639824684D8295";

type HashedData = {
  twitter?: string;
  github?: string;
  phone?: string;
  salt?: string;
};

const SybilResistance = () => {
  const { provider, account: web3Account } = useWeb3Modal();
  const { isSpectatorMode, spectatorAccount } = useContext(SpectatorModeContext);
  const account = isSpectatorMode ? spectatorAccount : web3Account;
  const currentAccount = useRef(account);

  const { updateNotification, clearNotification } = useNotifications();

  const unregisteredHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

  const [hash, setHash] = useState<string>(unregisteredHash);
  const [hashedData, setHashedData] = useState<HashedData>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const updateHashedData = (key: keyof HashedData, value: string) => {
    setHashedData({ ...hashedData, [key]: value });
  };

  const preImage = JSON.stringify(hashedData);

  // NOTE: slightly nasty hack to allow to download file using a button rather than a link
  // win95 react does not expose a link with a button style and this seemed to be the simplest way to go
  const downloadFile = (() => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    return () => {
      const urlData = new Blob([preImage], { type: "application/json" });
      const url = window.URL.createObjectURL(urlData);
      a.href = url;
      a.download = "GyroscopeData.json";
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();

  const levelCompleted = hash !== unregisteredHash;
  const showDownloadLink = Object.keys(hashedData).length > 0 && levelCompleted;

  const submitIdentification = async () => {
    if (!provider || !account) return;

    const signer = provider.getSigner(account);
    const identification = IdentificationFactory.connect(contractAddr, signer);

    updateNotification({
      message: "Submitting transaction",
      child: LoopGIF,
      title: "Update",
    });

    try {
      const hash = sha256(preImage);
      setSubmitting(true);
      const tx = await identification.register("0x" + hash);

      const receipt = await tx.wait();
      setSubmitting(false);
      clearNotification();
      if (receipt.status === 1) {
        setHash(hash);
      }
    } catch (e) {
      setSubmitting(false);
      updateNotification({
        message: "",
        title: "Error",
        copy: JSON.stringify(e),
      });
    }
  };

  const checkIfRegistered = useCallback(async () => {
    const currentProvider = provider || new ethers.providers.Web3Provider(window.ethereum);

    const identification = IdentificationFactory.connect(contractAddr, currentProvider);
    const hasRegistered = await identification.registrations(account);
    setHash(hasRegistered[0]);
  }, [setHash, account, provider]);

  useEffect(() => {
    if (!account) return;
    if (currentAccount.current !== account) {
      setHash(unregisteredHash);
      currentAccount.current = account;
    }

    checkIfRegistered();
  }, [provider, account, checkIfRegistered]);

  return (
    <WindowContent>
      For detailed instructions, see&nbsp;
      <a
        href="https://medium.com/gyroscope-protocol/gyrosoft-all-weather-simulator-level-2-5-mission-control-sybil-resistance-40295bafa9cb"
        target="_blank"
        rel="noreferrer"
      >
        <u>here</u>
      </a>
      .
      <ol>
        <li>
          1. Enter any or all of: (i) Twitter handle, (ii) GitHub handle and (iii) phone number. For
          added privacy it is possible to salt your hash. We do not store this information anywhere:
          it is hashed in your browser and only the hash is stored on the blockchain.{" "}
        </li>
        <li>2. Click Submit and wait for the transaction to be executed. </li>
        <li>
          3. Click "Download .json file" and STORE THE FILE SOMEWHERE SAFE! You'll need it later.
        </li>
      </ol>
      <Fieldset label="Progress">
        <Checkbox label="Completed" checked={levelCompleted} />
        <>
          {!levelCompleted || showDownloadLink ? (
            <div>
              <InputItem
                label="Twitter handle"
                value={hashedData.twitter || ""}
                disabled={levelCompleted}
                placeholder="gyroscope"
                onChange={(e) => updateHashedData("twitter", e.target.value)}
              />
              <InputItem
                label="Github handle"
                value={hashedData.github || ""}
                disabled={levelCompleted}
                placeholder="stablecoin-labs"
                onChange={(e) => updateHashedData("github", e.target.value)}
              />
              <InputItem
                label="Phone number w/ country code"
                value={hashedData.phone || ""}
                disabled={levelCompleted}
                placeholder="+1-123-456-7890"
                onChange={(e) => updateHashedData("phone", e.target.value)}
              />
              <InputItem
                label="Salt (optional)"
                value={hashedData.salt || ""}
                disabled={levelCompleted}
                placeholder="Salt"
                onChange={(e) => updateHashedData("salt", e.target.value)}
              />
            </div>
          ) : null}

          {levelCompleted ? (
            <InputItem label="hash" value={hash} placeholder="hash" disabled />
          ) : null}

          {showDownloadLink ? (
            <Button onClick={downloadFile}>Download .json file</Button>
          ) : levelCompleted ? null : (
            <Button onClick={submitIdentification}>
              {submitting ? "tx in progress" : "Submit"}
            </Button>
          )}
        </>
      </Fieldset>
    </WindowContent>
  );
};

export default SybilResistance;
