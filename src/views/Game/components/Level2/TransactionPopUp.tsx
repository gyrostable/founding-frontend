import { useState } from "react";
import { WindowContent, Button, Window, WindowHeader, TextField } from "react95";

import styled from "styled-components";
import { CloseIcon } from "components/react95";
import { isValidTransactionHash } from "helpers";

const TransactionPopupWrapper = styled.div`
  display: ${(props) => (props.hidden ? "none" : "block")};
  position: absolute;
  top: -250px;
  left: 40%;
  z-index: 10000;
`;

type Transactions = {
  transactionHash1: string;
  transactionHash2: string;
};

type TransactionPopUpProps = {
  show: boolean;
  closeModal: () => void;
  onSubmit: (hashes: Transactions) => Promise<void>;
};

const TransactionPopUp = (props: TransactionPopUpProps) => {
  const [transactionHash1, setTransactionHash1] = useState("");
  const [transactionHash2, setTransactionHash2] = useState("");

  const valid =
    isValidTransactionHash(transactionHash1) && isValidTransactionHash(transactionHash2);

  const modalClose = () => {
    setTransactionHash1("");
    setTransactionHash2("");
    props.closeModal();
  };

  const handleSubmit = () => {
    props.onSubmit({ transactionHash1, transactionHash2 });
    modalClose();
  };

  return (
    <TransactionPopupWrapper hidden={!props.show}>
      <Window className="window">
        <WindowHeader className="window-header">
          <span>arbitrage-verification.exe</span>
          <Button onClick={modalClose}>
            <CloseIcon />
          </Button>
        </WindowHeader>
        <WindowContent>
          <div className="form-group">
            <label>Transaction 1 Hash:</label>
            <TextField
              value={transactionHash1}
              placeholder="0x1234abcd"
              onChange={(e) => setTransactionHash1(e.target.value)}
              fullWidth
            />

            <label>Transaction 2 Hash:</label>
            <TextField
              value={transactionHash2}
              placeholder="0x1234abcd"
              onChange={(e) => setTransactionHash2(e.target.value)}
              fullWidth
            />
          </div>
          <hr />
          <Button onClick={(_e) => handleSubmit()} disabled={!valid}>
            Submit hashes
          </Button>
        </WindowContent>
      </Window>
    </TransactionPopupWrapper>
  );
};

export default TransactionPopUp;
