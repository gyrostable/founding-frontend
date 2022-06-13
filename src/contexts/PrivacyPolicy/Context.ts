import { createContext, Dispatch, SetStateAction } from "react";

export interface PrivacyPolicyContext {
  hasAccepted: boolean;
  setHasAccepted: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<PrivacyPolicyContext>({
  hasAccepted: true,
  setHasAccepted: () => {},
});

export default Context;
