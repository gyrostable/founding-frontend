import { useEffect, useState } from "react";

export const useHasReadPolicy = (modalVisible) => {
  const [hasReadPolicy, setHasReadPolicy] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      const node = document.getElementById("privacy-policy-container");

      const onScroll = () => {
        if (node.scrollHeight === Math.ceil(node.scrollTop + node.clientHeight)) {
          setHasReadPolicy(true);
        }
      };
      node.addEventListener("scroll", onScroll);

      return () => node.removeEventListener("scroll", onScroll);
    }
  }, [modalVisible]);

  return hasReadPolicy;
};
