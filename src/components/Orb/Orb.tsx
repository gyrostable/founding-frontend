import styled from "styled-components";

interface StageProps {
  size?: number;
}

interface BallProps {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
}

interface OrbProps extends StageProps, BallProps {}

const Orb = ({
  size = 75,
  color1 = "#81e8f6",
  color2 = "#76deef",
  color3 = "#055194",
  color4 = "#062745",
}: OrbProps) => {
  return (
    <Stage size={size}>
      <Ball color1={color1} color2={color2} color3={color3} color4={color4} />
    </Stage>
  );
};

const Ball = styled.figure<BallProps>`
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(
    circle at 50% 120%,
    ${({ color1 }) => color1},
    ${({ color2 }) => color2} 10%,
    ${({ color3 }) => color3} 80%,
    ${({ color4 }) => color4} 100%
  );

  &:before {
    content: "";
    position: absolute;
    top: 1%;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 0px, #ffffff, rgba(255, 255, 255, 0) 58%);
    -webkit-filter: blur(5px);
    z-index: 2;
  }
`;

const Stage = styled.section<StageProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;
  margin: 20px;
  -webkit-perspective: ${({ size }) => size * 4}px;
  -moz-perspective: ${({ size }) => size * 4}px;
  -ms-perspective: ${({ size }) => size * 4}px;
  -o-perspective: ${({ size }) => size * 4}px;
  perspective: ${({ size }) => size * 4}px;
  -webkit-perspective-origin: 50% 50%;
  -moz-perspective-origin: 50% 50%;
  -ms-perspective-origin: 50% 50%;
  -o-perspective-origin: 50% 50%;
  perspective-origin: 50% 50%;
`;

export default Orb;
