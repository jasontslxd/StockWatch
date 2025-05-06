import { PropsWithChildren } from 'react';

export const LandingBanner: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ height: '40vh' }} className="bg-danger">
      {children}
    </div>
  );
};
