import { Page } from "common"
import { TickerNewsItem, Spacer, TickerNewsItemLoading } from "components";
import { useTickerNews } from "hooks";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router"

interface ITickerNewsProps {
  ticker: string;
}

export const TickerNews = ({ticker}: ITickerNewsProps) => {
  const { news, isLoading } = useTickerNews(ticker);
  console.log(isLoading)

  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="fw-bold">News</p>
        <Link className="text-decoration-none" to={Page.News.replace(':ticker', ticker)}>See all <i className="bi bi-arrow-right" /></Link>
      </div>
      {isLoading ? (
        <ListGroup>
          {[...Array(3)].map((_, idx) => (
            <ListGroup.Item key={idx} className="border-1 rounded">
              <TickerNewsItemLoading />
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : ( news && news.feed.length > 0 ? (
        <ListGroup>
          {news.feed.slice(0, 3).map((newsItem, idx) => (
            <div key={idx}>  
              <ListGroup.Item className="border-1 rounded" as={Link} to={newsItem.url} target="_blank">
                <TickerNewsItem newsItem={newsItem} />
              </ListGroup.Item>
              <Spacer size="xs" />
            </div>
          ))}
        </ListGroup>
      ) : (
        <p>No news found</p>
      ))}
    </>
  )
}