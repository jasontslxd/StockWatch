import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useTopGainerLoser } from 'hooks';
import { Spacer, TickerCard, TickerCardLoading } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Page } from 'common';

export const GainersLosers: React.FC = () => {
  const {
    data: { topGainers, topLosers },
    isLoading: isLoadingTopGainersLosers,
    isError: isErrorTopGainersLosers,
    isRateLimitError: isRateLimitErrorTopGainersLosers
  } = useTopGainerLoser();
  const [showTopGainersLosersModal, setShowTopGainersLosersModal] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRateLimitErrorTopGainersLosers) {
      navigate(Page.RateLimit);
    }
  }, [isRateLimitErrorTopGainersLosers, navigate]);

  const renderTopGainersLosers = (renderOnlyTop: boolean) => {
    const numberToRender = renderOnlyTop ? 1 : 5;

    if (isLoadingTopGainersLosers) {
      return Array.from({ length: numberToRender }).map((_, index) => (
        <div key={index}>
          <Row>
            <Col>
              <TickerCardLoading />
            </Col>
            <Col>
              <TickerCardLoading />
            </Col>
          </Row>
          <Spacer size="xxs" />
        </div>
      ));
    }

    if (isErrorTopGainersLosers) {
      return (
        <div className="d-flex flex-column align-items-center">
          <p className="text-center">
            Oh no! Something went wrong loading the top gainers and losers.
            Please try again.
          </p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      );
    }

    return (
      <>
        <Row>
          <Col>
            <h4 className="fw-bold">Top Gainers</h4>
          </Col>
          <Col>
            <h4 className="fw-bold">Top Losers</h4>
          </Col>
        </Row>
        {Array.from({ length: numberToRender }).map((_, index) => (
          <div key={index}>
            <Row>
              <Col xs={6}>
                <TickerCard tickerPerformance={topGainers[index]} />
              </Col>
              <Col xs={6}>
                <TickerCard tickerPerformance={topLosers[index]} />
              </Col>
            </Row>
            <Spacer size="xxs" />
          </div>
        ))}
      </>
    );
  };

  const renderTopGainersLosersModal = () => {
    return (
      <Modal
        centered
        show={showTopGainersLosersModal}
        onHide={() => setShowTopGainersLosersModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Top Gainers and Losers</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderTopGainersLosers(false)}</Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <Spacer size="xs" />
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold">Top Gainers and Losers</h4>
            <Button
              variant="link"
              className="text-decoration-none"
              onClick={() => setShowTopGainersLosersModal(true)}
            >
              See all <i className="bi bi-arrow-right" />
            </Button>
          </div>
        </Col>
      </Row>
      <Spacer size="xxs" />
      {renderTopGainersLosers(true)}
      <Spacer size="sm" />
      {renderTopGainersLosersModal()}
    </>
  );
};
