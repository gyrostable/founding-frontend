import { Address, Gyro, MonetaryAmount, Token, Reserve } from "@gyrostable/sdk";
import { createContext } from "react";

export interface BalancesContext {
  tokens: Token[];
  balances: Record<Address, MonetaryAmount>;
  reserveValues: Reserve[];
  gyroBalance: MonetaryAmount;
  fetchGyroBalances: (gyro: Gyro) => Promise<void>;
  gyroTotalSupply: MonetaryAmount;
  fetchAll: (gyro: Gyro) => Promise<void>;
}

const Context = createContext<BalancesContext>({
  tokens: [],
  balances: {},
  reserveValues: [],
  gyroBalance: MonetaryAmount.fromNormalized(0),
  fetchGyroBalances: (_gyro: Gyro) => Promise.resolve(),
  gyroTotalSupply: MonetaryAmount.fromNormalized(0),
  fetchAll: (_gyro: Gyro) => Promise.resolve(),
});

export default Context;
