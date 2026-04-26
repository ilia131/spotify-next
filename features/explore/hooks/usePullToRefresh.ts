import { useRef } from "react";

export const usePullToRefresh = (refresh: () => void) => {
  const startY = useRef(0);
  const pullDistance = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    pullDistance.current = e.touches[0].clientY - startY.current;
  };

  const handleTouchEnd = () => {
    if (pullDistance.current > 80) refresh();
    pullDistance.current = 0;
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
