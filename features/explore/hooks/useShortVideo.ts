import { useState, useCallback } from "react";
import { Shorts, useLazyGetShortVideoQuery } from "@/redux/services/artistApislice";
import { generateVideoThumbnail } from "../utils/generateVideoThumbnail";




interface ShortsApiResponse {
  next: string | null;
  results: Shorts[];
}

export const useShortVideos = () => {
  const [videos, setVideos] = useState<Shorts[]>([]);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [trigger] = useLazyGetShortVideoQuery();

  const extractCursor = (next: string | null) => {
    if (!next) return null;
    const url = new URL(next);
    return url.searchParams.get("cursor");
  };

  const generateThumbnails = async (items: Shorts[]) => {
    const results = await Promise.all(
      items.map(async (v) => ({
        uuid: v.uuid,
        thumb: await generateVideoThumbnail(v.video),
      }))
    );

    const map: Record<string, string> = {};

    results.forEach((r) => {
      if (r.thumb) map[r.uuid] = r.thumb;
    });

    setThumbnails((prev) => ({ ...prev, ...map }));
  };

  const loadVideos = useCallback(async () => {
    setLoading(true);

    const res = await trigger({});

    if (res.data) {
      setVideos(res.data.results);
      setNextCursor(extractCursor(res.data.next));
      await generateThumbnails(res.data.results);
    }

    setLoading(false);
  }, [trigger]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loading) return;

    setLoading(true);

    const res = (await trigger({ cursor: nextCursor })) as {
      data?: ShortsApiResponse;
    };

    if (res.data) {
      setVideos((prev) => {
        const ids = new Set(prev.map((v) => v.uuid));
        const filtered = res.data!.results.filter((v) => !ids.has(v.uuid));
        return [...prev, ...filtered];
      });

      setNextCursor(extractCursor(res.data.next));
      await generateThumbnails(res.data.results);
    }

    setLoading(false);
  }, [nextCursor, loading, trigger]);

  return { videos, thumbnails, loading, loadVideos, loadMore , generateThumbnails };
};
