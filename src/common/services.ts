import { ITickerPriceData, TickerMovementTimeRange } from "common";
import { isSameDay, subDays } from "date-fns";

export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.length === 8 && phoneNumber.match(/^[0-9]+$/) !== null;
}

export const isValidOtp = (otp: string) => {
  return otp.length === 6 && otp.match(/^[0-9]+$/) !== null;
}

export const parseChangeAmount = (value: string) => {
  // Convert to number and handle invalid inputs
  const num = parseFloat(value);
  if (isNaN(num)) return value;

  // Format to 2 decimal places
  const formattedNumber = Math.abs(num).toFixed(2);
  
  // Add sign and dollar symbol
  const sign = num >= 0 ? '+' : '-';
  return `${sign}$${formattedNumber}`;
}

export const parseChangePercentage = (value: string) => {
  // Remove any existing % sign and convert to number
  const cleanValue = value.replace('%', '');
  const num = parseFloat(cleanValue);
  if (isNaN(num)) return value;

  // Format to 2 decimal places
  const formattedNumber = Math.abs(num).toFixed(2);
  
  // Add sign and percentage symbol
  const sign = num >= 0 ? '+' : '-';
  return `${sign}${formattedNumber}%`;
}

export const mapTickerHistoricalPriceToPoints = (tickerHistoricalPrice: ITickerPriceData[], selectedTimeRange: TickerMovementTimeRange) => {
  const currentDate = new Date();
  let filteredData: ITickerPriceData[];

  switch (selectedTimeRange) {
    case TickerMovementTimeRange.OneDay: {
      // For OneDay, get the last trading day's data
      const lastTradingDay = tickerHistoricalPrice
        .filter(price => price.date <= currentDate)
        .sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.date;
      
      if (!lastTradingDay) return [];
      
      filteredData = tickerHistoricalPrice.filter(price => 
        isSameDay(price.date, lastTradingDay)
      );
      break;
    }

    case TickerMovementTimeRange.FiveDays:
      filteredData = tickerHistoricalPrice.filter(price => 
        price.date >= subDays(currentDate, 5) && price.date <= currentDate
      );
      break;

    case TickerMovementTimeRange.ThirtyDays:
      filteredData = tickerHistoricalPrice.filter(price => 
        price.date >= subDays(currentDate, 30) && price.date <= currentDate
      );
      break;

    case TickerMovementTimeRange.NinetyDays:
      filteredData = tickerHistoricalPrice.filter(price => 
        price.date >= subDays(currentDate, 90) && price.date <= currentDate
      );
      break;

    case TickerMovementTimeRange.SixMonths:
      filteredData = tickerHistoricalPrice.filter(price => 
        price.date >= subDays(currentDate, 180) && price.date <= currentDate
      );
      break;

    case TickerMovementTimeRange.OneYear:
      filteredData = tickerHistoricalPrice.filter(price => 
        price.date >= subDays(currentDate, 365) && price.date <= currentDate
      );
      break;

    case TickerMovementTimeRange.AllTime:
    default:
      filteredData = tickerHistoricalPrice;
  }

  const chronologicallyOrderedData = [...filteredData].reverse();
  return chronologicallyOrderedData.map(point => ({
    close: parseFloat(point.close),
    date: point.date
  }));
}