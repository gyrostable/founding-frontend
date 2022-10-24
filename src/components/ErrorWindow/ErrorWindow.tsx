import { Button, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";
import { CloseIcon, StyledWindow } from "components/react95";
import { useNotifications } from "contexts/Notifications";

interface ErrorWindowProps {
  message?: string | string[];
  isMobile?: boolean;
}

const ErrorWindow = ({ message = "" }: ErrorWindowProps) => {
  const {
    notification: { title, child, copy },
    clearNotification,
  } = useNotifications();
  const isVisible = message.length > 0 || child || copy;

  const wrapper = (
    <Wrapper>
      <Window>
        <StyledWindowHeader active={true}>
          <span>{`${title}.exe`}</span>
          <Button onClick={clearNotification}>
            <CloseIcon />
          </Button>
        </StyledWindowHeader>
        <StyledWindowContent>
          {copy && !message
            ? "An error has occurred, copy error message to clipboard"
            : formatMessage(message)}
        </StyledWindowContent>
        {child}
        {copy.length > 0 ? (
          <Button
            onClick={() => {
              navigator.clipboard.writeText(copy);
            }}
          >
            Copy to clipboard
          </Button>
        ) : null}
      </Window>
    </Wrapper>
  );

  return isVisible ? wrapper : <></>;
};

const Wrapper = styled.div`
  position: absolute;
  margin: auto;
  z-index: 100;
  top: 20%;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
`;

const StyledWindowContent = styled(WindowContent)`
  hyphens: auto;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Window = styled(StyledWindow)`
  max-width: 800px;
  min-height: 200px;
`;

function formatMessage(message: string | string[]) {
  if (!Array.isArray(message)) return message;
  return (
    <>
      {message.map((msg, index) => (
        <p key={index} style={{ margin: "10px" }}>
          {msg}
        </p>
      ))}
    </>
  );
}

export default ErrorWindow;
