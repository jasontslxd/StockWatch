import { IPortfolioItem } from "common";
import { ChangePercentage, TickerLogo } from "components";
import { useFinnhubTickerProfile, useTickerGlobalQuote } from "hooks";
import { useEffect } from "react";
import { Col, ListGroup, Placeholder, Row } from "react-bootstrap";

interface IPortfolioItemProps {
  portfolioItem: IPortfolioItem;
  setPortfolioPnL: React.Dispatch<React.SetStateAction<number>>;
}

export const PortfolioItem: React.FC<IPortfolioItemProps> = ({ portfolioItem, setPortfolioPnL }) => {
  const { ticker, quantity, averagePrice, totalCost } = portfolioItem;
  const { globalQuote, isLoadingGlobalQuote } = useTickerGlobalQuote(ticker!);
  const { price: currentPrice } = globalQuote || {};
  const { tickerProfile, isLoadingTickerProfile, isErrorTickerProfile } = useFinnhubTickerProfile(ticker);
  const { name: tickerName } = tickerProfile || {};

  const unitMovement = currentPrice ? (parseFloat(currentPrice) - averagePrice) : 0;
  const pnl = unitMovement * quantity;

  useEffect(() => {
    setPortfolioPnL(prevPnL => prevPnL + pnl);

    return () => {
      setPortfolioPnL(prevPnL => prevPnL - pnl);
    };
  }, [pnl, setPortfolioPnL]);

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
          <p className="m-0">P&L:{' '}
            <ChangePercentage changePercentage={pnl.toFixed(2)} fillBackground />
          </p>
        </Col>
      </Row>
    </ListGroup.Item>
  )
};
