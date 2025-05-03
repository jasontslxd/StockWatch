import { ICompanyNewsFeedItem } from "common";
import { getTimePassed } from "./TickerNewsItem.service";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
interface ITickerNewsItemProps {
  newsItem: ICompanyNewsFeedItem;
}

export const TickerNewsItem = ({ newsItem }: ITickerNewsItemProps) => {
  const { title, source, time_published, url, source_domain } = newsItem;
  const timePassed = getTimePassed(time_published);

  return (
    <div onClick={() => window.open(url, '_blank')}>
      <Row>
        <Col className="d-flex justify-content-center align-items-center" xs={2}>
          <img className="rounded-circle border border-1" style={{ width: '36px', height: '36px' }} src={`https://icon.horse/icon/${source_domain}`} />
        </Col>
        <Col xs={10}>
          <p className="fw-bold m-0 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>{title}</p>
          <div className="d-flex">
            <p className="text-secondary">{source}</p>
            <p className="text-secondary mx-2">•</p>
            <p className="text-secondary">{timePassed}</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}