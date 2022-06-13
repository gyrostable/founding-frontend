import { BigNumber } from "@ethersproject/bignumber";

export function decodeCheckValue(input: { done: boolean; metadata: BigNumber }) {
  if (!input) return [null, null, null];
  const number = input.metadata.toNumber();
  return decodeArray(number);
}

function decodeArray(encoded) {
  const value1 = Math.floor(encoded / 1000000);
  const value2 = Math.floor((encoded % 1000000) / 1000);
  const value3 = encoded % 1000;

  return [value1, value2, value3];
}
