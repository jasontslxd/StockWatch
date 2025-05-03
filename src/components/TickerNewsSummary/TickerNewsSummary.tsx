import { Page } from "common"
import { TickerNewsItem, Spacer, TickerNewsItemLoading } from "components";
import { useTickerNews } from "hooks";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router"

interface ITickerNewsSummaryProps {
  ticker: string;
}

export const TickerNewsSummary = ({ticker}: ITickerNewsSummaryProps) => {
  const { news, isLoading, isError } = useTickerNews(ticker);

  const renderTickerNews = () => {
    if (isLoading) {
      return (
        <ListGroup>
          {[...Array(3)].map((_, idx) => (
            <ListGroup.Item key={idx} className="border-1 rounded">
              <TickerNewsItemLoading />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )
    }

    if (isError) {
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
        {feed.slice(0, 5).map((newsItem, idx) => (
          <div key={idx}>  
            <ListGroup.Item className="border-1 rounded" as={Link} to={newsItem.url} target="_blank">
            <TickerNewsItem newsItem={newsItem} />
          </ListGroup.Item>
            <Spacer size="xs" />
          </div>
        ))}
      </ListGroup>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="fw-bold">News</p>
        <Link className="text-decoration-none" to={Page.News.replace(':ticker', ticker)}>See all <i className="bi bi-arrow-right" /></Link>
      </div>
      {renderTickerNews()}
    </>
  )
}