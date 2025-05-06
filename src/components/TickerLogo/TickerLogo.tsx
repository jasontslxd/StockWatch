import { useFinnhubTickerProfile } from 'hooks';
import React from 'react';
import { Placeholder } from 'react-bootstrap';

interface ITickerLogoProps {
  ticker: string;
  renderLoading?: boolean;
  className?: string;
}

export const TickerLogo: React.FC<ITickerLogoProps> = ({
  ticker,
  renderLoading = false,
  className = '',
}) => {
  const {
    data: tickerProfile,
    isLoading: isLoadingTickerProfile,
    isError: isErrorTickerProfile,
  } = useFinnhubTickerProfile(ticker);

  if (isLoadingTickerProfile || renderLoading) {
    return (
      <div
        style={{
          width: '3rem',
          height: '3rem',
        }}
        className={className}
      >
        <Placeholder
          animation="wave"
          className="rounded-circle w-100 h-100"
          xs={3}
        >
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    );
  }

  if (isErrorTickerProfile || !tickerProfile || !tickerProfile.logo) {
    return (
      <div
        style={{
          width: '3rem',
          height: '3rem',
        }}
        className={className}
      >
        <span className="border border-2 border-secondary rounded-circle w-100 h-100 d-flex justify-content-center align-items-center">
          {ticker.charAt(0)}
        </span>
      </div>
    );
  }

  const { logo } = tickerProfile;
  return (
    <div
      style={{
        width: '3rem',
        height: '3rem',
      }}
      className={className}
    >
      <img
        src={logo}
        alt={`${ticker} logo`}
        className="img-fluid rounded-circle w-100 h-100"
      />
    </div>
  );
};
