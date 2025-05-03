import { ITickerPriceData, ITickerTimeSeriesApiResponse, TickerMovementTimeRange, TickerTimeSeriesFrequency } from "common";

export const mapTickerMovementTimeRangeToTimeSeriesFrequency = (timeRange: TickerMovementTimeRange): TickerTimeSeriesFrequency => {
  switch (timeRange) {
    case TickerMovementTimeRange.OneDay:
    case TickerMovementTimeRange.FiveDays:
    case TickerMovementTimeRange.ThirtyDays:
      return TickerTimeSeriesFrequency.Intraday;
    default:
      return TickerTimeSeriesFrequency.Daily;
  }
}

export const mapDateStringToDate = (dateString: string): Date => {
  return new Date(dateString);
}

export const mapTickerHistoricalPrice = (response: ITickerTimeSeriesApiResponse, frequency: TickerTimeSeriesFrequency): ITickerPriceData[] => {
  const priceData = response[frequency === TickerTimeSeriesFrequency.Intraday ? 'Time Series (5min)' : 'Time Series (Daily)'];
  const priceDataArray = Object.keys(priceData).map(key => {
    const price = priceData[key];
    return {
      date: mapDateStringToDate(key),
      open: price['1. open'],
      high: price['2. high'],
      low: price['3. low'],
      close: price['4. close'],
      volume: price['5. volume'],
    }
  });
  return priceDataArray;
}