import styled from "styled-components";

export const Body = styled.div`
  align-items: center;
  background: #000000;
  background: linear-gradient(
    167deg,
    rgba(0, 0, 0, 1) 50%,
    rgba(3, 57, 45, 1) 65%,
    rgba(246, 183, 120, 1) 100%
  );
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
  position: relative;
  padding: 20px 0;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;

  ${(props) => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const H1 = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

export const H3 = styled.h3`
  font-size: 21px;
  margin: 20px 0;
`;
