import { ITickerPerformance } from "common";
import { Spacer, TickerLogo } from "components";
import { useTickerLogo } from "hooks";
import { Card, Placeholder } from "react-bootstrap";

interface ITickerCardProps {
  tickerPerformance: ITickerPerformance;
}

export const TickerCard: React.FC<ITickerCardProps> = ({ tickerPerformance }) => {
  const { ticker, price, change_percentage, change_amount } = tickerPerformance;

  const isPositive = change_percentage[0] !== '-';
  const changePercentageBackgroundColor = isPositive ? 'lightgreen' : 'lightcoral';
  const changePercentageTextColor = isPositive ? 'success' : 'danger';

  const parsedChangeAmount = isPositive ? `+${change_amount}` : change_amount;
  const parsedChangePercentage = isPositive ? `+${change_percentage}` : change_percentage;
  const parsedPrice = `$${price}`

  const { tickerLink, isLoading } = useTickerLogo(ticker);

  const renderTickerLogo = () => {
    if (isLoading) {
      return <Placeholder as={TickerLogo} animation="wave"><Placeholder xs={12} className="rounded-circle w-100 h-100" /></Placeholder>
    }

    if (tickerLink) {
      return (
        <TickerLogo>
          <img src={tickerLink} alt={`${ticker} logo`} className="img-fluid rounded-circle w-100 h-100" />
        </TickerLogo>
      )
    }

    return (
      <TickerLogo>
        <span className="border border-2 border-secondary rounded-circle w-100 h-100 d-flex justify-content-center align-items-center">{ticker.charAt(0)}</span>
      </TickerLogo>
    )
  }
    
  return (
    <Card className="bg-white">
      <Card.Body>
        <Card.Title>
          {renderTickerLogo()}
        </Card.Title>
        <Card.Text className="fs-5 fw-bold m-0">
          {ticker}
        </Card.Text>
        <Card.Text className="fw-bold m-0">
          {parsedPrice}
        </Card.Text>
        <Spacer size="xxs" />
        <Card.Text>
          <span style={{backgroundColor: changePercentageBackgroundColor}} className={`fw-bold text-${changePercentageTextColor} rounded-1 p-1`}>{parsedChangePercentage}</span>
          <span className="ms-2 text-secondary">{parsedChangeAmount}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};