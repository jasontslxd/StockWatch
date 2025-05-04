import { Page } from "common";
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router";

interface IWatchlistItemProps {
  ticker: string;
}

export const WatchlistItem: React.FC<IWatchlistItemProps> = ({ ticker }) => {
  return (
    <ListGroup.Item key={ticker} as={Link} to={Page.Instrument.replace(":ticker", ticker)}>{ticker}</ListGroup.Item>
  )
}