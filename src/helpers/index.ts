import { BigNumber } from "@ethersproject/bignumber";
import { MonetaryAmount } from "@gyrostable/sdk";

export const numberWithCommas = (val: number | string) => {
  return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const withPrecision = (amount: MonetaryAmount, precision: number = 4): number => {
  const roundedValue = amount.value.div(BigNumber.from(10).pow(amount.decimals - precision));
  return roundedValue.toNumber() / Math.pow(10, precision);
};

const hexValidChars = "0123456789abcdefABCDEF";

export const isValidTransactionHash = (txHash: string): boolean => {
  if (!(txHash.startsWith("0x") && txHash.length === 66)) {
    return false;
  }
  for (let i = 2; i < txHash.length; i++) {
    if (!hexValidChars.includes(txHash.charAt(i))) {
      return false;
    }
  }
  return true;
};

export const formatWalletAddress = (address) => {
  const char = 12 / 2;
  return address && `${address.slice(0, char)}...${address.slice(address.length - char)}`;
};
