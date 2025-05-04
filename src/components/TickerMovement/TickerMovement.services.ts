import { ITickerChange, ITickerPriceDataPoint } from "common";

export const getChangeWithinTimeRange = (closingPrices: ITickerPriceDataPoint[]): ITickerChange => {
  const firstPrice = closingPrices[0].close;
  const lastPrice = closingPrices[closingPrices.length - 1].close;
  const changeValue = lastPrice - firstPrice;
  const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;

  return {
    changeValue: changeValue.toString(),
    changePercent: changePercent.toString()
  }
}
