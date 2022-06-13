import styled from "styled-components";

const ClaimLoadingBar = ({ progress }) => {
  return (
    <Container>
      <Bar progress={progress} />
    </Container>
  );
};

const Container = styled.div`
  border-radius: 2rem;
  box-shadow: 0 0 5px #e76f51;
  height: 2rem;
  overflow: hidden;
  position: relative;
  transition: all 0.5s;
  width: 80%;
  will-change: transform;
`;

const Bar = styled.div<{ progress: number }>`
  align-items: center;
  background-color: #e76f51;
  border-radius: inherit;
  bottom: 0;
  color: white;
  content: "";
  display: flex;
  font-family: sans-serif;
  height: 100%;
  justify-content: center;
  left: ${({ progress }) => -100 + progress + "%"};
  position: absolute;
  top: 0;
  width: 100%;
  transition: all linear 0.3s;
`;

export default ClaimLoadingBar;
