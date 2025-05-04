import { IPortfolioItem } from "common";
import { TickerLogo } from "components";
import { useFinnhubTickerProfile, useTickerGlobalQuote } from "hooks";
import { Col, ListGroup, Placeholder, Row } from "react-bootstrap";

interface IPortfolioItemProps {
  portfolioItem: IPortfolioItem;
}

export const PortfolioItem: React.FC<IPortfolioItemProps> = ({ portfolioItem }) => {
  const { ticker, quantity, averagePrice, totalCost } = portfolioItem;
  const { globalQuote, isLoadingGlobalQuote, isErrorGlobalQuote } = useTickerGlobalQuote(ticker!);
  const { price: currentPrice } = globalQuote || {};
  const { tickerProfile, isLoadingTickerProfile, isErrorTickerProfile } = useFinnhubTickerProfile(ticker);
  const { name: tickerName } = tickerProfile || {};

  const renderTickerLogo = () => {
    if (isLoadingTickerProfile) {
      return <Placeholder as={TickerLogo} animation="wave"><Placeholder xs={12} className="rounded-circle w-100 h-100" /></Placeholder>
    }

    if (isErrorTickerProfile || !tickerProfile || !tickerProfile.logo) {
      return (
        <TickerLogo>
          <span className="border border-2 border-secondary rounded-circle w-100 h-100 d-flex justify-content-center align-items-center">{ticker.charAt(0)}</span>
        </TickerLogo>
      )
    }

    const { logo } = tickerProfile;
    return (
      <TickerLogo>
        <img src={logo} alt={`${ticker} logo`} className="img-fluid rounded-circle w-100 h-100" />
      </TickerLogo>
    )
  }

  if (isLoadingGlobalQuote) {
    return <ListGroup.Item key={ticker} className="rounded-2">
      <Row>
        <Col>
          <Placeholder as={TickerLogo} animation="wave"><Placeholder xs={12} className="rounded-circle w-100 h-100" /></Placeholder>
        </Col>
        <Col>
          <Placeholder as="p" animation="wave"><Placeholder xs={12} /></Placeholder>
        </Col>
      </Row>
    </ListGroup.Item>
  }

  const renderPnL = () => {
    if (isErrorGlobalQuote) {
      return null;
    }

    const unitMovement = currentPrice ? (parseFloat(currentPrice) - averagePrice) : 0;
    const noChange = unitMovement === 0;
    const isPositive = unitMovement > 0;
    const changePercentageBackgroundColor = noChange ? 'lightgray' : isPositive ? 'lightgreen' : 'lightcoral';
    const changePercentageTextColor = noChange ? 'secondary' : isPositive ? 'success' : 'danger';

    return (
      <p className="m-0">P&L:{' '}
        <span style={{backgroundColor: changePercentageBackgroundColor}} className={`fw-bold text-${changePercentageTextColor} rounded-1 p-1`}>${(unitMovement * quantity).toFixed(2)}</span>
      </p>
    )
  }


  return (
    <ListGroup.Item key={ticker} className="rounded-2">
      <Row>
        <Col xs={5} className="d-flex flex-column justify-content-center">
          {renderTickerLogo()}
          <p className="m-0">{ticker}</p>
          <p className="m-0">{tickerName}</p>
        </Col>
        <Col xs={7} className="d-flex flex-column justify-content-center text-end">
          <p className="m-0">Quantity: {quantity}</p>
          <p className="m-0">Latest price: ${currentPrice}</p>
          <p className="m-0">Current value: ${totalCost.toFixed(4)}</p>
          {renderPnL()}
        </Col>
      </Row>
    </ListGroup.Item>
  )
};
