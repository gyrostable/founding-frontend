import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  padding: 0 10px;
`;

export const WarningText = styled.p`
  color: red;
  font-size: 20px;
  margin-top: 30px;
  max-width: 1000px;
  text-align: center;
`;

export const OpenModalText = styled.u`
  cursor: pointer;
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100vw;
  height: calc(100% - 190px);
  z-index: 10;
  top: 190px;
`;
