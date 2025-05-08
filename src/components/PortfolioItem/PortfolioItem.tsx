import { IPortfolioItem, Page } from 'common';
import { ChangePercentage, TickerLogo } from 'components';
import {
  useFinnhubTickerProfile,
  useNavigateOnMissingData,
  useTickerGlobalQuote,
} from 'hooks';
import { useEffect } from 'react';
import { Col, ListGroup, Placeholder, Row } from 'react-bootstrap';

interface IPortfolioItemProps {
  portfolioItem: IPortfolioItem;
  setPortfolioPnL: React.Dispatch<React.SetStateAction<number>>;
}

export const PortfolioItem: React.FC<IPortfolioItemProps> = ({
  portfolioItem,
  setPortfolioPnL,
}) => {
  const { ticker, quantity, averagePrice, totalCost } = portfolioItem;
  const {
    data: globalQuote,
    isLoading: isLoadingGlobalQuote,
    isRateLimitError: isRateLimitErrorGlobalQuote,
  } = useTickerGlobalQuote(ticker!);
  const { price: currentPrice } = globalQuote || {};
  const { data: tickerProfile } = useFinnhubTickerProfile(ticker);
  const { name: tickerName } = tickerProfile || {};

  useNavigateOnMissingData({
    shouldNavigate: isRateLimitErrorGlobalQuote,
    pageToNavigate: Page.RateLimit,
  });

  const unitMovement = currentPrice
    ? parseFloat(currentPrice) - averagePrice
    : 0;
  const pnl = unitMovement * quantity;

  useEffect(() => {
    setPortfolioPnL((prevPnL) => prevPnL + pnl);

    return () => {
      setPortfolioPnL((prevPnL) => prevPnL - pnl);
    };
  }, [pnl, setPortfolioPnL]);

  if (isLoadingGlobalQuote) {
    return (
      <ListGroup.Item key={ticker} className="rounded-2">
        <Row>
          <Col>
            <TickerLogo ticker={ticker} renderLoading />
          </Col>
          <Col>
            <Placeholder as="p" animation="wave">
              <Placeholder xs={12} />
            </Placeholder>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item key={ticker} className="rounded-2">
      <Row>
        <Col xs={5} className="d-flex flex-column justify-content-center">
          <TickerLogo ticker={ticker} />
          <p className="fw-bold m-0">{ticker}</p>
          <p className="m-0">{tickerName}</p>
        </Col>
        <Col
          xs={7}
          className="d-flex flex-column justify-content-center text-end"
        >
          <p className="m-0">Quantity: {quantity}</p>
          <p className="m-0">Latest price: ${currentPrice}</p>
          <p className="m-0">Current value: ${totalCost.toFixed(4)}</p>
          <p className="m-0">
            P&L:{' '}
            <ChangePercentage
              changePercentage={pnl.toFixed(2)}
              fillBackground
            />
          </p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
