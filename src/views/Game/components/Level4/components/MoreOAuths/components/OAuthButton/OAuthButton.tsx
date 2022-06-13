import { SpectatorModeContext } from "contexts/SpectatorMode";
import { useContext } from "react";
import { Button } from "react95";
import { Box } from "../../MoreOAuths.styles";
import { VerifiedText } from "../../MoreOAuths.styles";

export const OAuthButton = ({ children, endpoint, verified }) => {
  const { isSpectatorMode } = useContext(SpectatorModeContext);
  return (
    <Box>
      <a
        href={"https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/auth/" + endpoint}
      >
        <Button disabled={verified || isSpectatorMode}>{children}</Button>
      </a>
      {verified && <VerifiedText>Verified</VerifiedText>}
    </Box>
  );
};
