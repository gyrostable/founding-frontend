import { useContext } from "react";

import { PrivacyPolicyContext } from "contexts/PrivacyPolicy";

const usePrivacyPolicy = () => {
  return {
    ...useContext(PrivacyPolicyContext),
  };
};

export default usePrivacyPolicy;
