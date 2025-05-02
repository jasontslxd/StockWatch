import { TickerMovementTimeRange } from "common";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const TickerMovement = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TickerMovementTimeRange>(TickerMovementTimeRange.OneDay);

  return (
    <>
      <div className="d-flex">
        <p className="me-2">Price</p>
        <p className="me-2">Change percent</p>
        <p>Market cap</p>
      </div>
      <div className="d-flex justify-content-between">
        {Object.values(TickerMovementTimeRange).map((timeRange, idx) => (
          <Button key={idx} variant={timeRange === selectedTimeRange ? "dark" : "white"} onClick={() => setSelectedTimeRange(timeRange)}>{timeRange}</Button>
        ))}
      </div>
    </>
  );
};