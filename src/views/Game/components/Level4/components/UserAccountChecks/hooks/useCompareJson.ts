import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useNotifications } from "contexts/Notifications";
import { sha256 } from "js-sha256";
import { useSavedHash } from "./useSavedHash";

export const useCompareJson = () => {
  const [json, setJson] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const savedHash = useSavedHash();
  const updateNotification = useNotifications().updateNotification;
  const updateNotificationStatic = useRef(updateNotification);

  // Handler function
  const compareJson = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setJson(e.target.result);
    };
  };

  useEffect(() => {
    const verifiedJson = localStorage.getItem("verifiedJson");
    if (verifiedJson) {
      setJson(verifiedJson);
      setVerified(true);
    }
  }, []);

  useEffect(() => {
    if (json && savedHash) {
      const hash = "0x" + sha256(json);
      setVerified(hash === savedHash);

      if (hash !== savedHash) {
        updateNotificationStatic.current({
          message: `Verification failed: Hash of uploaded JSON did not match saved hash. Saved hash value: "${savedHash}". Hash of uploaded JSON: "${hash}"`,
          title: "Error",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setJson(null);
      } else {
        localStorage.setItem("verifiedJson", json);
      }
    }
  }, [json, savedHash]);

  return {
    verified,
    json,
    compareJson,
  };
};
