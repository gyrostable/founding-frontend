import styled from "styled-components";
import { WindowHeader } from "react95";
import { StyledWindow } from "components/react95";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
`;

export const Window = styled(StyledWindow)`
  height: min(1000px, 90vh);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(800px, 80vw);
  position: relative;
`;

export const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PolicyContainer = styled.div`
  margin: 20px 30px;
  position: relative;
  max-height: calc(98% - 130px);
  overflow-y: scroll;

  h2 {
    font-size: 25px;
    margin: 40px 0 20px;
  }

  h3 {
    font-size: 20px;
    margin: 40px 0 20px;
  }

  p {
    margin: 20px 0;
  }
  li {
    margin: 10px 20px 0;
  }
`;

export const Header = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 30px;
  text-align: center;

  p {
    margin: 5px 0;
  }
`;
