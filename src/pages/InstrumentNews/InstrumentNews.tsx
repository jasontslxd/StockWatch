import { InstrumentHeader, Spacer, TickerNewsItem, TickerNewsItemLoading } from "components";
import { Button, Container, ListGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import { useTickerNews } from "hooks";
import { Page } from "common";
import { useEffect } from "react";

export const InstrumentNews: React.FC = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();
  const { news, isLoadingTickerNews, isErrorTickerNews } = useTickerNews(ticker!, 20);

  useEffect(() => {
    if (!ticker) {
      navigate(Page.NotFound);
    }
  }, [ticker, navigate]);
  
  const renderTickerNews = () => {
    if (isLoadingTickerNews) {
      return (
        <ListGroup>
          {[...Array(20)].map((_, idx) => (
            <ListGroup.Item key={idx} className="border-1 rounded">
              <TickerNewsItemLoading />
            </ListGroup.Item>
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
        {feed.map((newsItem, idx) => (
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

  return (
    <Container>
      <InstrumentHeader ticker={ticker!} backDestination={Page.Instrument} />
      <h3>Top news</h3>
      {renderTickerNews()}
    </Container>
  )
}