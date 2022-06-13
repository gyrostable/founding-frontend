import styled from "styled-components";
import { AiFillTwitterCircle, AiFillGithub, AiFillMediumSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import Emoji from "components/Emoji";
import Outlink from "components/Outlink";
import { Link } from "react-router-dom";

const emojiSize = "2em";

interface FooterProps {
  isMobile?: boolean;
}

const Footer = ({ isMobile = false }: FooterProps) => {
  if (isMobile) {
    return (
      <StyledFooter>
        <Centered>
          <FooterOutlinks />
        </Centered>
      </StyledFooter>
    );
  }

  return (
    <StyledFooter>
      <StyledLeft>
        &copy; FTL Labs 2021. All Rights Reserved.{" "}
        <Link to="/privacy-policy">
          <u>Privacy Policy</u>
        </Link>
        <Link to="/terms-of-service">
          <u style={{ marginLeft: "7px" }}>Terms of Service</u>
        </Link>
      </StyledLeft>
      <Centered>
        Build with <Emoji label="math" symbol="🏫📚📐📏" /> and{" "}
        <Emoji label="science" symbol="🔬" />
      </Centered>
      <StyledRight>
        <FooterOutlinks />
      </StyledRight>
    </StyledFooter>
  );
};

const FooterOutlinks = () => (
  <IconContext.Provider value={{ size: emojiSize }}>
    <Outlink url="https://twitter.com/GyroStable">
      <AiFillTwitterCircle />
    </Outlink>
    <Outlink url="https://medium.com/gyroscope-protocol">
      <AiFillMediumSquare />
    </Outlink>
    <Outlink url="https://github.com/stablecoin-labs">
      <AiFillGithub />
    </Outlink>
  </IconContext.Provider>
);

const Centered = ({ children }) => (
  <Parent>
    <Child>{children}</Child>
  </Parent>
);

const margin = 25;

const StyledFooter = styled.footer`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  height: 72px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 0 ${margin}px;
`;

const Parent = styled.div`
  position: absolute;
  left: 50%;
`;

const Child = styled.div`
  position: relative;
  left: -50%;
`;

const StyledLeft = styled.div`
  position: absolute;
  left: ${margin}px;
  color: gray;
  font-size: smaller;
`;

// TODO: eliminate absolute positioning?
const StyledRight = styled.div`
  height: ${emojiSize};
  position: absolute;
  right: ${margin}px;
`;

export default Footer;
