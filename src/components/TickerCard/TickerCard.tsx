import { ITickerPerformance } from "common";
import { Spacer } from "components";
import { Card } from "react-bootstrap";

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
    
  return (
    <Card className="bg-white">
      <Card.Body>
        <Card.Title>
          {`${ticker} - logo`}
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