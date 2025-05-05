import { ITickerPriceDataPoint, TickerMovementTimeRange } from "common"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { formatXAxis } from "./TickerMovementChart.service";
import { format } from "date-fns";

interface ITickerMovementChart {
  data: ITickerPriceDataPoint[];
  selectedTimeRange: TickerMovementTimeRange;
  displayFullChart?: boolean;
}

export const TickerMovementChart: React.FC<ITickerMovementChart> = ({ data, selectedTimeRange, displayFullChart = true }) => {
  if (data.length === 0) {
    return null;
  }

  const closingPrices = data.map(d => d.close);

  const minPrice = Math.min(...closingPrices);
  const maxPrice = Math.max(...closingPrices);
  const padding = (maxPrice - minPrice) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={displayFullChart ? 300 : 36}>
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke={data[0].close > data[data.length-1].close ? "red" : "green"} 
          dot={false} 
        />
        <YAxis 
          domain={[minPrice - padding, maxPrice + padding]}
          tickFormatter={(value) => `$${value.toFixed(2)}`}
          hide={!displayFullChart}
        />
        {displayFullChart && (
          <>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value: Date) => formatXAxis(value, selectedTimeRange)}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(date: Date) => format(date, 'MMM d, yyyy')}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}