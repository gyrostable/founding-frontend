import { MonetaryAmount, Token, TokenWithAmount } from "@gyrostable/sdk";
import AssetCard from "components/AssetCard";
import { NumberField } from "components/react95";
import useBalances from "contexts/Balances/useBalances";
import { useNotifications } from "contexts/Notifications";
import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { withPrecision } from "helpers";
import produce from "immer";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Button, Divider, Fieldset } from "react95";
import styled from "styled-components";

const computeNewCoins = (
  previousCoins: TokenWithAmount[],
  token: Token,
  amount: MonetaryAmount
) => {
  return produce(previousCoins, (coins) => {
    const newInput = { token: token.address, amount };
    const currentInputIndex = coins.findIndex((i) => i.token === token.address);

    // if the amount is zero (i.e. we don't use this coin to mint/redeem)
    // remove it from the input is found
    if (amount.isZero()) {
      if (currentInputIndex >= 0) {
        coins.splice(currentInputIndex, 1);
      }
      return;
    }

    if (currentInputIndex >= 0) {
      coins[currentInputIndex] = newInput;
    } else {
      coins.push(newInput);
    }
  });
};

interface MintRedeemProps {
  executeMintRedeem: (
    coins: TokenWithAmount[],
    threshold: MonetaryAmount,
    slippage: number
  ) => void;
  estimateThreshold: (coins: TokenWithAmount[]) => Promise<MonetaryAmount>;
  labels: Labels;
  checkMax: boolean;
  validateInputs: (amounts: Record<string, MonetaryAmount>, estimated: MonetaryAmount) => boolean;
}

interface Labels {
  title: string;
  button: string;
  amountCondition: string;
  inputError?: string;
}

const errorColor = "#ff0000";
const ErrorMessage = styled.span<{ error?: boolean }>`
  color: ${errorColor};
  display: ${({ error }) => (error ? "" : "none")};
  margin-left: 0.5rem;
`;

const MintRedeem = ({
  executeMintRedeem,
  labels,
  estimateThreshold,
  checkMax,
  validateInputs,
}: MintRedeemProps) => {
  const { tokens, balances } = useBalances();
  const [coins, setCoins] = useState([]);
  const [slippage, setSlippage] = useState<number>(0.5);
  const [thresholdAmount, setThresholdAmount] = useState(MonetaryAmount.fromNormalized(0));
  const [amounts, setAmounts] = useState<Record<string, MonetaryAmount>>({});

  const hasInputs = useMemo(() => coins.length > 0, [coins]);

  const validInputValues = useMemo(() => {
    return validateInputs(amounts, thresholdAmount);
  }, [validateInputs, amounts, thresholdAmount]);

  const runEstimateThreshold = async (newCoins: TokenWithAmount[]) => {
    try {
      const amount = await estimateThreshold(newCoins);
      setThresholdAmount(amount);
    } catch (e) {
      console.error(e);
      // TODO: show some toast with an error message
    }
  };

  const execute = async () => {
    if (!hasInputs) {
      return;
    }

    setCoins([]);
    setThresholdAmount(MonetaryAmount.fromNormalized(0));
    setAmounts({});

    executeMintRedeem(coins, thresholdAmount, slippage / 100);
  };

  const updateEstimate = debounce((token, amount) => {
    const newInputCoins = computeNewCoins(coins, token, amount);
    setCoins(newInputCoins);
    runEstimateThreshold(newInputCoins); // NOTE: no need to await this
  }, 300);

  const onInputModified = (token: Token) => (amount: MonetaryAmount) => {
    updateEstimate(token, amount);
    const newAmounts = produce(amounts, (newAmounts) => {
      newAmounts[token.symbol] = amount;
    });
    setAmounts(newAmounts);
  };

  const updateEstimatedAmount = (value: string) => {
    let newAmount = 0;
    try {
      newAmount = parseInt(value, 10);
      if (newAmount < 0) {
        newAmount = 0;
      }
    } catch (e) {
      newAmount = 0;
    }

    setThresholdAmount(MonetaryAmount.fromNormalized(newAmount));
  };

  const updateSlippage = (value: string) => {
    const newAmount = Math.round(parseFloat(value) * 10) / 10;
    setSlippage(newAmount > 0 ? (newAmount <= 100 ? newAmount : 100) : 0);
  };

  const getAmount = (token: Token): number => {
    if (!(token.symbol in amounts)) {
      return 0;
    }

    const rawAmount = amounts[token.symbol];

    return withPrecision(rawAmount);
  };

  return (
    <Fieldset label={labels.title}>
      <AssetCardContainer>
        {tokens &&
          balances &&
          tokens.map((token, i) => (
            <AssetCard
              key={i}
              token={token}
              checkMax={checkMax}
              amount={getAmount(token)}
              balance={balances[token.symbol]}
              onInputModified={onInputModified(token)}
            />
          ))}
      </AssetCardContainer>

      <Divider
        size="100%"
        orientation="horizontal"
        style={{ marginTop: "25px", marginBottom: "25px" }}
      />

      <p>{labels.amountCondition}</p>
      <NumberField
        disabled
        value={thresholdAmount.toNormalizedNumber()}
        onChange={updateEstimatedAmount}
        step={0.1}
        min={0}
        width={130}
        hideIncrementer
      />

      <Button
        disabled={!hasInputs || !validInputValues || thresholdAmount.toNormalizedNumber() === 0}
        onClick={execute}
      >
        {labels.button}
      </Button>
      <ErrorMessage error={!validInputValues}>{labels.inputError}</ErrorMessage>

      <p>Slippage (%)</p>
      <NumberField
        value={slippage}
        onChange={updateSlippage}
        step={0.1}
        min={0}
        max={100}
        width={130}
      />
    </Fieldset>
  );
};

interface MintProps {
  onMint: (amount: MonetaryAmount) => any;
}

interface RedeemProps {
  onRedeem: (amount: MonetaryAmount) => any;
}

export const Mint = ({ onMint }: MintProps) => {
  const { gyro } = useWeb3Modal();
  const { balances } = useBalances();
  const { updateNotification } = useNotifications();

  const labels: Labels = {
    title: "Input basket:",
    button: "Mint",
    amountCondition: "Estimated GYD Minted",
  };

  const validInputValues = useCallback(
    (amounts: Record<string, MonetaryAmount>, _estimated: MonetaryAmount) => {
      return Object.keys(amounts).every((asset) => {
        return amounts[asset].lte(balances[asset]);
      });
    },
    [balances]
  );

  const executeMint = async (
    coins: TokenWithAmount[],
    thresholdAmount: MonetaryAmount,
    slippage: number
  ) => {
    console.log(`executing mint with ${coins.length} coins`);
    try {
      const amountWithSlippage = thresholdAmount.mul(1 - slippage);
      const mintResponse = await gyro.mint(coins, amountWithSlippage, true);
      // TODO: show this hash somewhere
      console.log(`executing tx ${mintResponse.tx.hash}`);

      const result = await mintResponse.wait();
      onMint(result.amountMinted);
    } catch (err) {
      const data = JSON.stringify(err.data || "");
      updateNotification({
        title: "Error",
        message: `We had some trouble minting... Here is the error we got:`,
        copy: `${err.message} -- ${data}`,
      });
    }
  };

  const estimateMinted = (coins: TokenWithAmount[]) => {
    if (coins.length === 0) {
      return Promise.resolve(new MonetaryAmount(0, 18));
    }
    return gyro.estimateMinted(coins);
  };

  return (
    <>
      <MintRedeem
        labels={labels}
        checkMax={true}
        executeMintRedeem={executeMint}
        estimateThreshold={estimateMinted}
        validateInputs={validInputValues}
      ></MintRedeem>
    </>
  );
};

export const Redeem = ({ onRedeem }: RedeemProps) => {
  const { gyro } = useWeb3Modal();
  const { gyroBalance } = useBalances();
  const { updateNotification } = useNotifications();

  const labels = {
    title: "Output basket:",
    button: "Redeem",
    amountCondition: "Maximum GYD to redeem",
    inputError: "Not enough GYD to redeem",
  };

  const validInputValues = useCallback(
    (amounts: Record<string, MonetaryAmount>, estimated: MonetaryAmount) => {
      return gyroBalance.gte(estimated);
    },
    [gyroBalance]
  );

  const executeRedeem = async (
    coins: TokenWithAmount[],
    thresholdAmount: MonetaryAmount,
    slippage: number
  ) => {
    console.log(`executing redeem with ${coins.length} coins`);
    try {
      const amountWithSlippage = thresholdAmount.mul(1 + slippage);
      const redeemResponse = await gyro.redeem(coins, amountWithSlippage, true);
      // TODO: show this hash somewhere
      console.log(`executing tx ${redeemResponse.tx.hash}`);

      const result = await redeemResponse.wait();
      onRedeem(result.amountRedeemed);
    } catch (err) {
      const data = JSON.stringify(err.data || "");
      updateNotification({
        title: "Error",
        message: `We had some trouble redeeming... Here is the error we got:`,
        copy: `${err.message} -- ${data}`,
      });
    }
  };

  const estimateRedeemed = (coins: TokenWithAmount[]) => {
    if (coins.length === 0) {
      return Promise.resolve(new MonetaryAmount(0, 18));
    }
    return gyro.estimateRedeemed(coins);
  };

  return (
    <MintRedeem
      labels={labels}
      checkMax={false}
      validateInputs={validInputValues}
      executeMintRedeem={executeRedeem}
      estimateThreshold={estimateRedeemed}
    ></MintRedeem>
  );
};

const AssetCardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  margin-left: auto;
  margin-right: auto;
`;

export default MintRedeem;
