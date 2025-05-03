import { TickerMovementTimeRange } from "common";
import { format } from "date-fns";

export const formatXAxis = (date: Date, selectedTimeRange: TickerMovementTimeRange) => {
  switch (selectedTimeRange) {
    case TickerMovementTimeRange.OneDay:
      return format(date, 'HH:mm');
    case TickerMovementTimeRange.FiveDays:
    case TickerMovementTimeRange.ThirtyDays:
      return format(date, 'MMM d');
    case TickerMovementTimeRange.NinetyDays:
    case TickerMovementTimeRange.SixMonths:
      return format(date, 'MMM yyyy');
    case TickerMovementTimeRange.OneYear:
    case TickerMovementTimeRange.AllTime:
    default:
      return format(date, 'MMM yyyy');
  }
};
