import styled from "styled-components";

export const HiddenInput = styled.input`
  opacity: 0;
  z-index: 1;
  position: absolute;
  left: 0;
  height: 100%;
  max-width: 100%;
`;

export const ButtonContainer = styled.div`
  position: relative;
  margin-right: 20px;
`;

export const VerifiedMessage = styled.p`
  color: lime;
`;
