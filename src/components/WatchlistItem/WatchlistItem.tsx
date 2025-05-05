import { mapTickerHistoricalPriceToPoints, Page, TickerMovementTimeRange, getChangeWithinTimeRange } from "common";
import { Col, ListGroup, Placeholder, Row } from "react-bootstrap"
import { Link } from "react-router";
import { useTickerHistoricalPrice, useTickerGlobalQuote } from "hooks";
import { TickerMovementChart, ChangePercentage } from "components";

interface IWatchlistItemProps {
  ticker: string;
}

export const WatchlistItem: React.FC<IWatchlistItemProps> = ({ ticker }) => {
  const { tickerHistoricalPrice, isLoadingTickerHistoricalPrice, isErrorTickerHistoricalPrice } = useTickerHistoricalPrice({ ticker, timeRange: TickerMovementTimeRange.OneDay });
  const { globalQuote, isLoadingGlobalQuote, isErrorGlobalQuote } = useTickerGlobalQuote(ticker);
  const historicalData = mapTickerHistoricalPriceToPoints(tickerHistoricalPrice, TickerMovementTimeRange.OneDay);

  if (isLoadingTickerHistoricalPrice || isLoadingGlobalQuote || historicalData.length === 0 || !globalQuote) {
    return (
      <ListGroup.Item key={ticker} as={Link} to={Page.Instrument.replace(":ticker", ticker)} className="d-flex justify-content-between align-items-center">
        <Placeholder xs={3}>
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder xs={5}>
          <Placeholder xs={12} />
        </Placeholder>
      </ListGroup.Item>
    )
  }

  if (isErrorTickerHistoricalPrice || isErrorGlobalQuote) {
    return (
      <ListGroup.Item key={ticker} as={Link} to={Page.Instrument.replace(":ticker", ticker)}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0">{ticker}</p>
          <p className="m-0">Error loading ticker information</p>
        </div>
      </ListGroup.Item>
    )
  }

  const { changePercent } = getChangeWithinTimeRange(historicalData);

  return (
    <ListGroup.Item key={ticker} as={Link} to={Page.Instrument.replace(":ticker", ticker)}>
      <Row>
        <Col xs={6} className="d-flex align-items-center">
          <i className="bi bi-star-fill text-warning me-2" />
          <div className="d-flex align-items-center flex-column">
            <p className="m-0">{ticker}</p>
            <ChangePercentage changePercentage={changePercent} />
          </div>
        </Col>
        <Col xs={3} className="d-flex align-items-center">
          <TickerMovementChart data={historicalData} selectedTimeRange={TickerMovementTimeRange.OneDay} displayFullChart={false} />
        </Col>
        <Col xs={3} className="d-flex align-items-center">
          <p className="m-0">${parseFloat(globalQuote.price).toFixed(2)}</p>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}