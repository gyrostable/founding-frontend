import { Window } from "react95";
import styled from "styled-components";

// VCR font only looks good for all caps
const StyledWindow = styled(Window)`
  * {
    font-family: "IBM Plex Mono", vcr, monospace;
    font-weight: 200;
  }
`;

export default StyledWindow;