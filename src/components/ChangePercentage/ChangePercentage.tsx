import { formatChangePercentage } from "common";

interface IChangePercentageProps {
  changePercentage: string;
  fillBackground?: boolean;
}

export const ChangePercentage: React.FC<IChangePercentageProps> = ({ changePercentage, fillBackground = false }) => {
  const noChange = parseFloat(changePercentage).toFixed(2) === '0.00';
  const isPositive = changePercentage[0] !== '-';
  const changePercentageBackgroundColor = noChange ? 'lightgray' : isPositive ? 'lightgreen' : 'lightcoral';
  const changePercentageTextColor = noChange ? 'secondary' : isPositive ? 'success' : 'danger';

  if (fillBackground) {
    return (
      <span style={{backgroundColor: changePercentageBackgroundColor}} className={`fw-bold text-${changePercentageTextColor} rounded-1 p-1`}>{formatChangePercentage(changePercentage)}</span>
    )
  }

  return (
    <span className={`fw-bold text-${changePercentageTextColor} rounded-1`}>{formatChangePercentage(changePercentage)}</span>
  )
}