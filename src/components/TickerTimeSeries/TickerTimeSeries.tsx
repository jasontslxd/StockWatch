import { ITickerPriceData, TickerMovementTimeRange, mapTickerHistoricalPriceToPoints } from "common";
import { Placeholder, Spinner } from "react-bootstrap";
import { formatXAxis } from "./TickerTimeSeries.service";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { format } from 'date-fns';

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
  const closingPrices = data.map(d => d.close);

  const minPrice = Math.min(...closingPrices);
  const maxPrice = Math.max(...closingPrices);
  const padding = (maxPrice - minPrice) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke={data[0].close > data[data.length-1].close ? "red" : "green"} 
          dot={false} 
        />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value: Date) => formatXAxis(value, selectedTimeRange)}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          domain={[minPrice - padding, maxPrice + padding]}
          tickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        <Tooltip 
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          labelFormatter={(date: Date) => format(date, 'MMM d, yyyy')}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}