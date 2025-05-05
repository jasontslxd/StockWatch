import { formatChangeAmount, ITickerGlobalQuote, TickerMovementTimeRange } from "common";
import { mapTickerHistoricalPriceToPoints, getChangeWithinTimeRange } from "common";
import { Spacer, TickerTimeSeries, ChangePercentage } from "components";
import { useTickerHistoricalPrice } from "hooks";
import { useState } from "react";
import { Button, Placeholder } from "react-bootstrap";

interface ITickerMovementProps {
  ticker: string;
  globalQuote: ITickerGlobalQuote | null;
  isLoadingGlobalQuote: boolean;
  isErrorGlobalQuote: boolean;
}

export const TickerMovement: React.FC<ITickerMovementProps> = ({ ticker, globalQuote, isLoadingGlobalQuote, isErrorGlobalQuote }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TickerMovementTimeRange>(TickerMovementTimeRange.OneDay);
  const { data: tickerHistoricalPrice, isLoading: isLoadingTickerHistoricalPrice, isError: isErrorTickerHistoricalPrice } = useTickerHistoricalPrice({
    ticker,
    timeRange: selectedTimeRange
  });


  const renderTickerSummary = () => {
    if (isLoadingGlobalQuote || isLoadingTickerHistoricalPrice) {
      return (
        <>
          <div className="d-flex">
            {[...Array(3)].map((_, idx) => (
              <Placeholder key={idx} xs={2} className="me-2" />
            ))}
          </div>
          <Spacer />
        </>
      )
    }

    if (isErrorGlobalQuote || !globalQuote) {
      return <p>Something went wrong fetching data for {ticker}. Please try again later.</p>
    }

    const { price, change: dailyChange, changePercent: dailyChangePercent } = globalQuote;
    const historicalData = mapTickerHistoricalPriceToPoints(tickerHistoricalPrice!, selectedTimeRange);
    const { changeValue: historicalChangeValue, changePercent: historicalChangePercent } = getChangeWithinTimeRange(historicalData);

    const displayedChange = selectedTimeRange === TickerMovementTimeRange.OneDay ? dailyChange : historicalChangeValue;
    const displayedChangePercent = selectedTimeRange === TickerMovementTimeRange.OneDay ? dailyChangePercent : historicalChangePercent;

    return (
      <div className="d-flex align-items-center">
        <h4 className="m-0 me-2 fw-bold">${price}</h4>
        <p className="m-0 me-2"><ChangePercentage changePercentage={displayedChangePercent} fillBackground /></p>
        <p className="text-secondary m-0">{formatChangeAmount(displayedChange)}</p>
      </div>
    )
  }

  return (
    <>
      {renderTickerSummary()}
      <Spacer size="sm" />
      <div className="d-flex justify-content-between">
        {Object.values(TickerMovementTimeRange).map((timeRange, idx) => (
          <Button key={idx} variant={timeRange === selectedTimeRange ? "dark" : "white"} onClick={() => setSelectedTimeRange(timeRange)}>{timeRange}</Button>
        ))}
      </div>
      <Spacer size="sm" />
      <TickerTimeSeries 
        tickerHistoricalPrice={tickerHistoricalPrice}
        isLoadingTickerHistoricalPrice={isLoadingTickerHistoricalPrice} 
        isErrorTickerHistoricalPrice={isErrorTickerHistoricalPrice} 
        selectedTimeRange={selectedTimeRange} 
      />
    </>
  );
};