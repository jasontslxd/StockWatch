import { ITickerPerformance, Page, formatChangeAmount } from "common";
import { Spacer, TickerLogo, ChangePercentage } from "components";
import { useNavigate } from "react-router";
import { Card } from "react-bootstrap";

interface ITickerCardProps {
  tickerPerformance: ITickerPerformance;
}

export const TickerCard: React.FC<ITickerCardProps> = ({ tickerPerformance }) => {
  const { ticker, price, change_percentage, change_amount } = tickerPerformance;
  const navigate = useNavigate();

  const parsedChangeAmount = formatChangeAmount(change_amount);
  const parsedPrice = `$${price}`

  return (
    <Card className="bg-white" onClick={() => navigate(Page.Instrument.replace(':ticker', ticker))}>
      <Card.Body className="p-2">
        <Card.Title>
          <TickerLogo ticker={ticker} />
        </Card.Title>
        <Card.Text className="fs-5 fw-bold m-0">
          {ticker}
        </Card.Text>
        <Card.Text className="fw-bold m-0">
          {parsedPrice}
        </Card.Text>
        <Spacer size="xxs" />
        <Card.Text>
          <ChangePercentage changePercentage={change_percentage} fillBackground />
          <span className="ms-2 text-secondary">{parsedChangeAmount}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};