import { ViewportSize } from 'common';
import { useState, useEffect } from 'react';

export const getViewportSize = (): ViewportSize => {
  const { innerWidth: width } = window;
  
  // to match bootstrap breakpoints
  if (width < 576) {
    return ViewportSize.xs;
  } else if (width < 768) {
    return ViewportSize.sm;
  } else if (width < 992) {
    return ViewportSize.md;
  } else if (width < 1200) {
    return ViewportSize.lg;
  } else if (width < 1400) {
    return ViewportSize.xl;
  } else {
    return ViewportSize.xxl;
  }
}

export const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>(getViewportSize());

  useEffect(() => {
    const handleResize = (): void => {
      setViewportSize(getViewportSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportSize;
}
