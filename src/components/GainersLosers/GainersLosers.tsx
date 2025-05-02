import { Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { useTopGainerLoser } from "hooks";
import { Spacer, TickerCard, TickerCardLoading } from "components";

export const GainersLosers: React.FC = () => {
  const { topGainer, topLoser, isLoading: isLoadingTopGainersLosers } = useTopGainerLoser();

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
    
    return (
      <Row>
        <Col>
          <TickerCard tickerPerformance={topGainer} />
        </Col>
        <Col>
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