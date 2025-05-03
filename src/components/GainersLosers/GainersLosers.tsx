import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { useTopGainerLoser } from "hooks";
import { Spacer, TickerCard, TickerCardLoading } from "components";

export const GainersLosers: React.FC = () => {
  const { topGainer, topLoser, isLoading: isLoadingTopGainersLosers, isError: isErrorTopGainersLosers } = useTopGainerLoser();

  const renderTopGainersLosers = () => {
    if (isLoadingTopGainersLosers) {
      return (
        <Row>
          <Col>
            <TickerCardLoading />
          </Col>
          <Col>
            <TickerCardLoading />
          </Col>
        </Row>
      );
    }
    
    if (isErrorTopGainersLosers) {
      return (
        <div className="d-flex flex-column align-items-center">
          <p className="text-center">Oh no! Something went wrong loading the top gainers and losers. Please try again.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>Try again</Button>
        </div>
      );
    }
    
    return (
      <Row>
        <Col xs={6}>
          <TickerCard tickerPerformance={topGainer} />
        </Col>
        <Col xs={6}>
          <TickerCard tickerPerformance={topLoser} />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Spacer size="xs" />
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold">Top Gainers and Losers</h4>
            <Link to="/gainers-losers" className="text-decoration-none">See all <i className="bi bi-arrow-right" /></Link>
          </div>
        </Col>
      </Row>
      <Spacer size="sm" />
      {renderTopGainersLosers()}
      <Spacer size="sm" />
    </>
  );
};