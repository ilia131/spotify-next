import { useEffect, useState } from "react";

export const useVideoVisibility = (
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>,
  videos: { uuid: string }[]
) => {
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (!id) return;

          if (entry.isIntersecting) {
            setVisibleVideos((prev) => {
              if (prev.has(id)) return prev;
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }
        });
      },
      { rootMargin: "300px" }
    );

    videos.forEach((v) => {
      const el = itemRefs.current[v.uuid];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [videos, itemRefs]);

  return visibleVideos;
};
