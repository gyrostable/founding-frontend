import styled from "styled-components";
import { ethers } from "ethers";
import { useState, useContext, useEffect } from "react";
import { formatWalletAddress } from "helpers";
import { SpectatorModeContext } from "contexts/SpectatorMode";

const SpectatorModeWarning = () => {
  const [editing, setEditing] = useState(true);
  const [newAddress, setNewAddress] = useState("");
  const [scrollHeight, setScrollHeight] = useState(0);

  const { exitSpectatorMode, spectatorAccount, setSpectatorAccount } =
    useContext(SpectatorModeContext);

  useEffect(() => {
    const listener = () => {
      setScrollHeight(window.scrollY);
    };
    document.addEventListener("scroll", listener);

    return () => {
      document.removeEventListener("scroll", listener);
      exitSpectatorMode();
    };
  }, [exitSpectatorMode]);

  // Handler functions ------------------------------
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSpectateClick = () => {
    if (!newAddress || newAddress === "Invalid address") {
      setNewAddress("");
      return toggleEditing();
    }

    if (!ethers.utils.isAddress(newAddress)) return setNewAddress("Invalid address");

    setSpectatorAccount(newAddress);
    setNewAddress("");
    toggleEditing();
  };

  // -------------------------------------------------

  return (
    <>
      <Container scrollHeight={scrollHeight}>
        <TextContainer>
          {editing ? (
            <>
              <Text>
                Enter new address to spectate:{" "}
                <StyledInput value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
              </Text>
            </>
          ) : (
            <>
              <Text>Your are currently viewing in Spectator Mode</Text>
              <Text>Spectating {formatWalletAddress(spectatorAccount)}</Text>
            </>
          )}
        </TextContainer>

        <Row>
          <Text
            onClick={exitSpectatorMode}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Exit Spectator Mode
          </Text>
          {editing ? (
            <Text
              onClick={onSpectateClick}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Spectate
            </Text>
          ) : (
            <Text
              onClick={toggleEditing}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Change address
            </Text>
          )}
        </Row>
      </Container>
      {scrollHeight > 72 && <Filler />}
    </>
  );
};

const Container = styled.div<{ scrollHeight: number }>`
  align-items: center;
  background-color: yellow;
  color: black;
  display: flex;
  height: 103px;
  flex-direction: column;
  justify-content: center;
  position: ${({ scrollHeight }) => (scrollHeight > 72 ? "fixed" : "static")};
  top: 0;
  width: 100%;
  z-index: 900;
`;

const Text = styled.p`
  font-size: 17px;
`;

const TextContainer = styled.div`
  text-align: center;
  width: 1140px;
`;

const StyledInput = styled.input`
  background-color: yellow;
  border-radius: 5px;
  width: 330px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 400px;
`;
const Filler = styled.div`
  background-color: black;
  height: 103px;
`;

export default SpectatorModeWarning;
