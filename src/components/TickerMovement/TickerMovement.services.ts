import { ITickerChange } from "common";

export const getChangeWithinTimeRange = (closingPrices: number[]): ITickerChange => {
  const firstPrice = closingPrices[0];
  const lastPrice = closingPrices[closingPrices.length - 1];
  const changeValue = lastPrice - firstPrice;
  const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;

  return {
    changeValue,
    changePercent
  }
}
