import { WindowContent } from "react95";
import styled from "styled-components";
import { InPersonPOAP } from "./components/InPersonPOAP/InPersonPOAP";
import { SybilList } from "./components/SybilList/SybilList";
import { GovVoters } from "./components/GovVoters/GovVoters";
import { AdditionalPOAPs } from "./components/AdditionalPOAPs/AdditionalPOAPs";
import { UserAccountChecks } from "./components/UserAccountChecks/UserAccountChecks";
import { DiscordChallenge } from "./components/DiscordChallenge/DiscordChallenge";
import { MoreOAuths } from "./components/MoreOAuths/MoreOAuths";
import { DeFiWhitelistAndKYC } from "./components/DeFiWhitelistAndKYC/DeFiWhitelistAndKYC";

const Separator = styled.hr`
  border-color: #31323c;
  margin: 50px 0;
`;

const Level4 = () => {
  return (
    <WindowContent>
      <p>
        Level 4 is about introducing sybil resistant mechanisms and is explained here:&nbsp;
        <a
          href="https://medium.com/gyroscope-protocol/gyroscope-level-4-enter-the-frog-games-b5b80f5d3ad2"
          target="_blank"
          rel="noreferrer"
        >
          <u>link</u>
        </a>
        .&nbsp;Each challenge awards Sybil points, but users do not need to pass every challenge.
      </p>

      <Separator />
      <InPersonPOAP />
      <Separator />
      <SybilList />
      <Separator />
      <GovVoters />
      <Separator />
      <AdditionalPOAPs />
      <Separator />
      <DiscordChallenge />
      <Separator />
      <UserAccountChecks />
      <Separator />
      <MoreOAuths />
      <Separator />
      <DeFiWhitelistAndKYC />
      <Separator />
    </WindowContent>
  );
};

export default Level4;
