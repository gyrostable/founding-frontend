import { useContext } from "react";

import { Web3Context } from "contexts/Web3";

const useWeb3Modal = () => {
  return {
    ...useContext(Web3Context),
  };
};

export default useWeb3Modal;
