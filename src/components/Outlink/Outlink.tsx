interface OutlinkProps {
  url: string;
  children?: React.ReactNode;
}

const Outlink:React.FC<OutlinkProps> = ({ url, children}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default Outlink;