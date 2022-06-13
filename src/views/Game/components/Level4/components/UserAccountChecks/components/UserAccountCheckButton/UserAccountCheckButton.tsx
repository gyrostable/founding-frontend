import { Button } from "react95";
import { VerifiedMessage } from "../../UserAccountChecks.styles";
import { Box } from "./UserAccountCheckButton.styles";

export const UserAccountCheckButton = ({ checkName, verified }) => {
  return (
    <Box>
      <a
        href={"https://tk0bsnc03i.execute-api.us-east-2.amazonaws.com/production/auth/" + checkName}
      >
        <Button disabled={verified}>
          Verify {checkName[0].toUpperCase() + checkName.slice(1)}
        </Button>
        {verified && <VerifiedMessage>Verified</VerifiedMessage>}
      </a>
    </Box>
  );
};
