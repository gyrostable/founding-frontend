import { MonetaryAmount, Token } from "@gyrostable/sdk";
import styled from "styled-components";
import Orb from "components/Orb";
import { NumberField } from "components/react95";
import { numberWithCommas, withPrecision } from "helpers";
import { BigNumber } from "@ethersproject/bignumber";

const roundedDecimals = 6;

const parseAmountValue = (value: string, decimals: number) => {
  let rawAmount = 0;

  if (value) {
    try {
      rawAmount = parseFloat(value.replace(",", ""));
      if (rawAmount < 0) {
        rawAmount = 0;
      }
    } catch (e) {
      rawAmount = 0;
    }
  }
  const roundedAmount = Math.round(rawAmount * Math.pow(10, roundedDecimals));
  const amount = BigNumber.from(roundedAmount).mul(
    BigNumber.from(10).pow(decimals - roundedDecimals)
  );

  return new MonetaryAmount(amount, decimals);
};

type AssetCardProps = {
  token: Token;
  amount: number;
  balance: MonetaryAmount;
  checkMax: boolean;
  onInputModified: (amount: MonetaryAmount) => void;
};

const AssetCard = ({ token, amount, balance, onInputModified, checkMax }: AssetCardProps) => {
  const onChange = (value: string) => {
    const amount = parseAmountValue(value, token.decimals);
    onInputModified(amount);
  };

  const isError = balance && checkMax && amount > withPrecision(balance);

  return (
    <StyledAssetCard>
      <Orb size={75} color2={"#6ed6a5"} />
      <StyledNumberField
        value={amount.toString()}
        error={isError}
        errorMessage="Value exceeds balance"
        onChange={onChange}
        step={1}
        min={0}
        width={130}
      />
      <Title>
        <AssetTitle>
          {numberWithCommas(withPrecision(balance))} {token.symbol}
        </AssetTitle>
      </Title>
    </StyledAssetCard>
  );
};

const StyledNumberField = styled(NumberField)`
  vertical-align: top;
  margin-top: 25px;
`;

const StyledAssetCard = styled.div`
  width: 250px;
  position: relative;
`;

const AssetTitle = styled.h3``;

const Title = styled.div`
  display: flex;
  margin: 0 4px;
  float: right;
  position: absolute;
  top: 70px;
  right: 0;
`;

export default AssetCard;
