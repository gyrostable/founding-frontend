import { Gyro, MonetaryAmount, Token, Reserve } from "@gyrostable/sdk";
import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { useEffect, useState, useCallback } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [balances, setBalances] = useState<Record<string, MonetaryAmount>>();
  const [reserveValues, setReserveValues] = useState<Reserve[]>([]);
  const [gyroBalance, setGyroBalance] = useState<MonetaryAmount>();
  const [gyroTotalSupply, setGyroTotalSupply] = useState<MonetaryAmount>();

  const { gyro } = useWeb3Modal();

  const fetchBalances = useCallback(async (gyro: Gyro) => {
    const tokens = await gyro.getSupportedTokens();
    const balanceEntries = await Promise.all(
      tokens.map(async (t: Token) => {
        const balance = await gyro.tokenBalance(t);
        return [t.symbol, balance];
      })
    );

    setTokens(tokens);
    setBalances(Object.fromEntries(balanceEntries));
  }, []);

  const fetchReserveValues = async (gyro: Gyro) => {
    const reserveValues = await gyro.getReserveValues();
    setReserveValues(reserveValues);
  };

  const fetchGyroBalances = async (gyro: Gyro) => {
    setGyroBalance(await gyro.balance());
  };

  // Ideally want to run this in the background every n-seconds
  const fetchGyroTotalSupply = async (gyro: Gyro) => {
    setGyroTotalSupply(await gyro.totalSupply());
  };

  const fetchAll = useCallback(
    async (gyro: Gyro) => {
      if (!gyro) {
        return;
      }

      fetchReserveValues(gyro);
      fetchBalances(gyro);
      fetchGyroBalances(gyro);
      fetchGyroTotalSupply(gyro);
    },
    [fetchBalances]
  );

  useEffect(() => {
    fetchAll(gyro);
  }, [gyro, fetchAll]);

  return (
    <Context.Provider
      value={{
        tokens,
        balances,
        gyroBalance,
        fetchGyroBalances,
        reserveValues,
        gyroTotalSupply,
        fetchAll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
