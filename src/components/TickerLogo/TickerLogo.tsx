import React, { PropsWithChildren } from "react";

export const TickerLogo: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{
      width: '3rem',
      height: '3rem',
    }}>
      {children}
    </div>
  )
}