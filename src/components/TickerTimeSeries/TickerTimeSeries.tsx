import { ITickerPriceData, TickerMovementTimeRange, mapTickerHistoricalPriceToPoints } from "common";
import { Placeholder, Spinner } from "react-bootstrap";
import { TickerMovementChart } from "components";

interface ITickerTimeSeriesProps {
  selectedTimeRange: TickerMovementTimeRange;
  tickerHistoricalPrice: ITickerPriceData[];
  isLoadingTickerHistoricalPrice: boolean;
  isErrorTickerHistoricalPrice: boolean;
}

export const TickerTimeSeries: React.FC<ITickerTimeSeriesProps> = ({ selectedTimeRange, tickerHistoricalPrice, isLoadingTickerHistoricalPrice, isErrorTickerHistoricalPrice }) => {
  if (isLoadingTickerHistoricalPrice || tickerHistoricalPrice.length === 0) {
    return (
      <div style={{ height: '300px' }} className="d-flex">
        <Placeholder xs={12} className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="white" />
        </Placeholder>
      </div>
    )
  }

  if (isErrorTickerHistoricalPrice) {
    return (
      <div>
        <p className="text-center">Error loading ticker historical price</p>
      </div>
    )
  }

  const data = mapTickerHistoricalPriceToPoints(tickerHistoricalPrice, selectedTimeRange)

  return (
    <TickerMovementChart data={data} selectedTimeRange={selectedTimeRange} />
  )
}