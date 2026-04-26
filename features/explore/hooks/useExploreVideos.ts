import { useState, useCallback } from "react";
import { useLazyGetShortVideoQuery } from "@/redux/services/artistApislice";
import { generateVideoThumbnail } from "../utils/generateVideoThumbnail";
import { ShortVideo, ShortsApiResponse } from "../types";

export const useExploreVideos = () => {
  const [videos, setVideos] = useState<ShortVideo[]>([]);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [trigger] = useLazyGetShortVideoQuery();

  const extractCursor = (next: string | null) => {
    if (!next) return null;
    return new URL(next).searchParams.get("cursor");
  };
  /////////////////////////////////////////////////
  const createThumbnails = async (items: ShortVideo[]) => {
    const thumbs = await Promise.all(
      items.map(async (v) => ({
        uuid: v.uuid,
        thumb: await generateVideoThumbnail(v.video),
      }))
    );

    const map: Record<string, string> = {};
    thumbs.forEach((t) => {
      if (t.thumb) map[t.uuid] = t.thumb;
    });

    setThumbnails((p) => ({ ...p, ...map }));
  };

  const loadInitial = useCallback(async () => {
    setLoading(true);

    const res = (await trigger({})) as { data?: ShortsApiResponse };

    if (res.data) {
      setVideos(res.data.results);
      setCursor(extractCursor(res.data.next));
      await createThumbnails(res.data.results);
    }

    setLoading(false);
  }, [trigger]);

  const loadMore = useCallback(async () => {
    if (!cursor || loading) return;

    setLoading(true);

    const res = (await trigger({ cursor })) as { data?: ShortsApiResponse };

    if (res.data) {
      setVideos((prev) => {
        const ids = new Set(prev.map((v) => v.uuid));
        const filtered = res.data!.results.filter((v) => !ids.has(v.uuid));
        return [...prev, ...filtered];
      });

      setCursor(extractCursor(res.data.next));
      await createThumbnails(res.data.results);
    }

    setLoading(false);
  }, [cursor, loading, trigger]);

  return { videos, thumbnails, loading, loadInitial, loadMore };
};
