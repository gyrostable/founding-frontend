import styled from "styled-components";

export const Body = styled.div`
  align-items: center;
  background: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  padding: 50px 0 150px;
  min-height: calc(100vh - 70px);
  position: relative;

  h1 {
    font-size: 48px;
    margin: 30px 0;
  }

  h2 {
    font-size: 32px;
    margin: 20px 0;
  }
  h3 {
    font-size: 22px;
    margin: 20px 0;
  }

  p,
  li {
    max-width: 1000px;
    font-size: 18px;
    margin: 20px 0;
  }

  li {
    margin-left: 40px;
  }
`;
