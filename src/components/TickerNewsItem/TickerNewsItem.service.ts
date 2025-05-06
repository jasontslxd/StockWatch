import { formatDistanceToNow } from 'date-fns';
import { parse } from 'date-fns';

export const getTimePassed = (timePublished: string): string => {
  const publishedDate = parse(timePublished, "yyyyMMdd'T'HHmmss", new Date());

  return formatDistanceToNow(publishedDate, { addSuffix: true });
};
