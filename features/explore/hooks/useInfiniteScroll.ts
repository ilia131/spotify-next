import { useRef, useCallback } from "react";

export const useInfiniteScroll = (
  loadMore: () => void,
  setRenderCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
            setRenderCount((prev) => prev + 20);
          }
        },
        { rootMargin: "400px" }
      );

      observerRef.current.observe(node);
    },
    [loadMore, setRenderCount]
  );

  return ref;
};
