import { useEffect, useState } from "react";
import styled from "styled-components";
import egg1 from "eggs/egg-1.png";
import egg2 from "eggs/egg-2.png";
import egg3 from "eggs/egg-3.png";
import egg4 from "eggs/egg-4.png";
import egg5 from "eggs/egg-5.png";
import egg6 from "eggs/egg-6.png";
import egg7 from "eggs/egg-7.png";
import egg8 from "eggs/egg-8.png";
import egg9 from "eggs/egg-9.png";
import egg10 from "eggs/egg-10.png";
import { useCountdown } from "../../../hooks/useCountdown";

const REVEAL_DELAY = 500;
const REVEAL_TIME = 2000;
const ANIMATION_TIME = 3000;
const LAUNCH_TIME = new Date("June 15, 2022 13:00:00").getTime(); // 12pm UTC Weds 15th June 2022

const EGGS = [egg1, egg2, egg3, egg4, egg5, egg6, egg7, egg8, egg9, egg10];

const FrogEgg = ({ account }: { account: string }) => {
  const [visible, setVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const { secondsLeft, minutesLeft, hoursLeft, daysLeft } = useCountdown(LAUNCH_TIME);

  useEffect(() => {
    setTimeout(() => setVisible(true), REVEAL_DELAY);
    setTimeout(() => setMessageVisible(true), REVEAL_DELAY + REVEAL_TIME);
  }, []);

  return (
    <>
      <Container visible={visible}>
        <img
          alt="frog-egg"
          src={EGGS[accountToImageIndex(account)]}
          height={"100%"}
          width={"100%"}
        />
      </Container>
      <MessageHeader visible={messageVisible}>Congratulations!</MessageHeader>
      <Message visible={messageVisible}>
        Your frog egg will hatch in {daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes and{" "}
        {secondsLeft} seconds
      </Message>
    </>
  );
};

const Container = styled.div<{ visible: boolean }>`
  align-items: center;
  display: flex;
  height: ${({ visible }) => (visible ? "500px" : "0")};
  justify-content: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all ${REVEAL_TIME / 1000}s ease-in-out;
  width: ${({ visible }) => (visible ? "500px" : "0")};

  img {
    animation: breathe ${ANIMATION_TIME / 1000}s ease-in-out ${(REVEAL_DELAY + REVEAL_TIME) / 1000}s
      infinite;

    @keyframes breathe {
      0% {
        height: 500px;
        width: 500px;
      }

      50% {
        height: 475px;
        width: 475px;
      }

      100% {
        height: 500px;
        width: 500px;
      }
    }
  }
`;

const MessageHeader = styled.h2<{ visible: boolean }>`
  font-weight: 900;
  font-size: 42px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all ${REVEAL_TIME / 1000}s ease-in-out;
`;

const Message = styled.p<{ visible: boolean }>`
  font-size: 21px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all ${REVEAL_TIME / 1000}s ease-in-out;
`;

function accountToImageIndex(account) {
  return parseInt(account.slice(account.length - 6, account.length), 16) % 10;
}

export default FrogEgg;
