import styled, { keyframes } from "styled-components";

// import Logo from "components/Logo";
import logo from "gyro_logo.png";
import { Button } from "components/Misc";
import useWeb3Modal from "contexts/Web3/useWeb3Modal";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { formatWalletAddress } from "helpers";
import { useContext } from "react";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const WalletButton = ({ provider, loadWeb3Modal, logoutOfWeb3Modal, account }) => {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : formatWalletAddress(account)}
    </Button>
  );
};

const SpectatorButton = ({ toggleSpectatorMode }) => {
  return (
    <AiFillEye
      onClick={toggleSpectatorMode}
      style={{ cursor: "pointer", marginLeft: "20px" }}
      size={28}
      color={"white"}
    />
  );
};

const Header = () => {
  const { provider, account, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();

  const { toggleSpectatorMode } = useContext(SpectatorModeContext);

  const { pathname } = useLocation();

  return (
    <StyledHeader>
      <a
        href="https://gyro.finance/"
        rel="noreferrer"
        target="_blank"
        style={{ height: "inherit" }}
      >
        <StyledLogo src={logo} alt="react-logo" />
      </a>

      <StyledRight>
        {pathname !== "/game" ? (
          <>
            <NavLink
              href="https://docs.gyro.finance/how-to-get-testnet-tokens"
              title="Get test tokens"
            />
            <NavLink href="https://gyro.finance" title="Home" />

            <Link style={{ color: "white", marginLeft: "20px" }} to="/game">
              Game
            </Link>

            <StyledLink style={{ color: "white", marginLeft: "20px" }} to="/claim">
              Claim your NFT
            </StyledLink>

            <NavLink href="https://docs.gyro.finance/testnet-walk-through" title="Tutorial" />
          </>
        ) : (
          <>
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
            <SpectatorButton toggleSpectatorMode={toggleSpectatorMode} />
          </>
        )}
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          account={account}
        />
      </StyledRight>
    </StyledHeader>
  );
};

interface NavLinkProps {
  target?: string;
  rel?: string;
  style?: object;
  href: string;
  title: string;
}

const defaultProps: NavLinkProps = {
  target: "_blank",
  rel: "noreferrer",
  style: {},
  href: "",
  title: "",
};

const NavLink = ({ target, rel, style, href, title } = defaultProps) => (
  <a
    target={target}
    rel={rel}
    style={{ ...style, ...{ color: "white", marginLeft: "20px" } }}
    href={href}
  >
    {title}
  </a>
);

const Glow = keyframes`
  0%{box-shadow: 5px 5px 20px orange, -5px -5px 20px orange}
  50%{box-shadow: 5px 5px 20px rgb(81, 224, 210), -5px -5px 20px rgb(81, 224, 210)}
  100%{box-shadow: 5px 5px 20px orange, -5px -5px 20px orange}
`;

const StyledLink = styled(Link)`
  transition: 0.3s;
  animation: ${Glow} 1s infinite;
  transition: 0.5s;
  border: none;
  border-radius: 50px;
  border-radius: 5px;
  padding: 0 10px;
`;

const StyledLogo = styled.img`
  height: calc(100% - 12px);
  padding: 6px 24px;
`;

const StyledHeader = styled.header`
  background-color: #000000;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  height: 72px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 100%;
`;

const StyledRight = styled.div`
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  height: 72px;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

export default Header;
