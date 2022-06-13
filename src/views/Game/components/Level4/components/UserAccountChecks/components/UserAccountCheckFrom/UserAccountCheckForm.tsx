import { Fieldset } from "react95";
import { UserAccountCheckButton } from "../UserAccountCheckButton/UserAccountCheckButton";
import { Box, Row } from "./UserAccountCheckForm.styles";
import { VerifyPhoneNumber } from "../VerifyPhoneNumber/VerifyPhoneNumber";

export const UserAccountCheckForm = ({ json, twitterPass, githubPass, phonePass }) => {
  return (
    <Fieldset label={"Verify"}>
      <Row>
        <Box>
          {json.twitter && <UserAccountCheckButton checkName="twitter" verified={twitterPass} />}
        </Box>
        <Box>
          {json.github && <UserAccountCheckButton checkName="github" verified={githubPass} />}
        </Box>
        <Box> {json.phone && <VerifyPhoneNumber json={json} phonePass={phonePass} />}</Box>
      </Row>
    </Fieldset>
  );
};
