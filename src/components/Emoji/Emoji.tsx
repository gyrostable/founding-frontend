interface EmojiProps {
  symbol: string;
  label?: string;
}

const Emoji: React.FC<EmojiProps> = ({ symbol, label }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? false : true}
  >
    {symbol}
  </span>
);

export default Emoji;
