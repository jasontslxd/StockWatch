import { TickerNewsItem, Spacer, TickerNewsItemLoading } from "components";
import { useTickerNews } from "hooks";
import { useState } from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import { Link } from "react-router"

interface ITickerNewsSummaryProps {
  ticker: string;
}

export const TickerNewsSummary = ({ticker}: ITickerNewsSummaryProps) => {
  const numberOfNewsToFetch = 20;
  const { news, isLoadingTickerNews, isErrorTickerNews } = useTickerNews(ticker, numberOfNewsToFetch);
  const [showTickerNewsModal, setShowTickerNewsModal] = useState(false);

  const renderTickerNewsSummary = (renderAll: boolean) => {
    const numberToRender = renderAll ? numberOfNewsToFetch : 5;

    if (isLoadingTickerNews) {
      return (
        <ListGroup>
          {[...Array(numberToRender)].map((_, idx) => (
            <div key={idx}>
              <ListGroup.Item className="border-1 rounded">
                <TickerNewsItemLoading />
              </ListGroup.Item>
              <Spacer size="xxs" />
            </div>
          ))}
        </ListGroup>
      )
    }

    if (isErrorTickerNews) {
      return (
        <div className="d-flex flex-column align-items-center">
          <Spacer />
          <p className="text-center">Oh no! Something went wrong loading the news. Please try again later.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>Try again</Button>
        </div>
      )
    }

    const { feed } = news || {};
    if (!feed || feed.length === 0) {
      return (
        <>
          <Spacer />
          <p className="text-center">No news found</p>
        </>
      )
    }

    return (
      <ListGroup>
        {/* slice here to accomodate for demo url */}
        {feed.slice(0, numberToRender).map((newsItem, idx) => (
          <div key={idx}>  
            <ListGroup.Item className="border-1 rounded" as={Link} to={newsItem.url} target="_blank">
              <TickerNewsItem newsItem={newsItem} />
            </ListGroup.Item>
            <Spacer size="xxs" />
          </div>
        ))}
      </ListGroup>
    )
  }

  const renderTickerNewsModal = () => {
    return (
      <Modal centered show={showTickerNewsModal} onHide={() => setShowTickerNewsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Top news for {ticker}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderTickerNewsSummary(true)}
        </Modal.Body>
      </Modal>
    )
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fw-bold m-0">News</p>
        <Button variant="link" className="text-decoration-none" onClick={() => setShowTickerNewsModal(true)}>See all <i className="bi bi-arrow-right" /></Button>
      </div>
      {renderTickerNewsSummary(false)}
      {renderTickerNewsModal()}
    </>
  )
}