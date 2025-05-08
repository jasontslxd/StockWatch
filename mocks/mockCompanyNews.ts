  import { ICompanyNews } from 'common';

  export const mockNewsData: ICompanyNews = {
    items: '2',
    sentiment_score_definition: 'Sentiment score definition',
    relevance_score_definition: 'Relevance score definition',
    feed: [
      {
        title: 'Test News 1',
        url: 'https://test1.com',
        time_published: '20240320T120000',
        authors: ['Author 1', 'Author 2'],
        summary: 'Test summary 1',
        banner_image: 'https://test1.com/image.jpg',
        source: 'Test Source 1',
        category_within_source: 'Technology',
        source_domain: 'test1.com',
        topics: [{ topic: 'Technology', relevance_score: '0.9' }],
        overall_sentiment_score: 0.5,
        overall_sentiment_label: 'Positive',
        ticker_sentiment: [
          {
            ticker: 'AAPL',
            relevance_score: '0.9',
            ticker_sentiment_score: '0.5',
            ticker_sentiment_label: 'Positive'
          }
        ]
      },
      {
        title: 'Test News 2',
        url: 'https://test2.com',
        time_published: '20240320T110000',
        authors: ['Author 3'],
        summary: 'Test summary 2',
        banner_image: 'https://test2.com/image.jpg',
        source: 'Test Source 2',
        category_within_source: 'Finance',
        source_domain: 'test2.com',
        topics: [{ topic: 'Finance', relevance_score: '0.8' }],
        overall_sentiment_score: -0.2,
        overall_sentiment_label: 'Negative',
        ticker_sentiment: [
          {
            ticker: 'AAPL',
            relevance_score: '0.8',
            ticker_sentiment_score: '-0.2',
            ticker_sentiment_label: 'Negative'
          }
        ]
      },
    ],
  };