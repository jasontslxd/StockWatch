import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { useTopGainerLoser } from "hooks";
import { Spacer, TickerCard } from "components";

export const GainersLosers: React.FC = () => {
  const { topGainer, topLoser, isLoading: isLoadingTopGainersLosers } = useTopGainerLoser();

  const renderTopGainersLosers = () => {
    if (isLoadingTopGainersLosers) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
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
    <div className="bg-light">
      <Container className="fluid vh-100">
        <Spacer size="xs" />
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">Gainers and Losers</h4>
              <Link to="/gainers-losers" className="text-decoration-none">See all <i className="bi bi-arrow-right" /></Link>
            </div>
          </Col>
        </Row>
        <Spacer size="sm" />
        {renderTopGainersLosers()}
        <Spacer size="sm" />
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold">Your watchlist</h4>
            <Link to="/watchlist" className="text-decoration-none">See all <i className="bi bi-arrow-right" /></Link>
          </div>
      </Container>
    </div>
  );
};