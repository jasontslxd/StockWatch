import { ICompanyNewsFeedItem } from "common";
import { formatDistanceToNow, parse } from "date-fns";

interface ITickerNewsItemProps {
  newsItem: ICompanyNewsFeedItem;
}

const getTimePassed = (timePublished: string): string => {
  const publishedDate = parse(
    timePublished,
    "yyyyMMdd'T'HHmmss",
    new Date()
  );
  
  return formatDistanceToNow(publishedDate, { addSuffix: true });
};

export const TickerNewsItem = ({ newsItem }: ITickerNewsItemProps) => {
  const { title, source, time_published, url } = newsItem;
  const timePassed = getTimePassed(time_published);

  return (
    <div onClick={() => window.open(url, '_blank')}>
      <p className="fw-bold m-0">{title}</p>
      <div className="d-flex">
        <p className="text-secondary">{source}</p>
        <p className="text-secondary mx-2">•</p>
        <p className="text-secondary">{timePassed}</p>
      </div>
    </div>
  )
}