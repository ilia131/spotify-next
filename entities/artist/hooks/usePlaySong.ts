import { useCallback } from "react";
import { useAppDispatch , useAppSelector } from "@/redux/hook";
import { useLazyGetSongPlayerQuery } from "@/redux/services/artistApislice";
import { setQueue , Song } from "@/redux/features/playerSlice";

export const usePlaySong = () => {

  const dispatch = useAppDispatch();
  const { queue } = useAppSelector((s) => s.player);

  const [fetchSong] = useLazyGetSongPlayerQuery();

  const playSong = useCallback(async (id:string) => {

    const index = queue.findIndex((s:Song) => s.unique_id === id);

    if (index !== -1) {
      dispatch(
        setQueue({
          songs: queue,
          startIndex: index
        })
      );
      return;
    }

    try {

      const song = await fetchSong(id).unwrap();

      const newQueue = [...queue, song];

      dispatch(
        setQueue({
          songs: newQueue,
          startIndex: newQueue.length - 1
        })
      );

    } catch (err) {
      console.error("play song error", err);
    }

  }, [queue, fetchSong, dispatch]);

  return { playSong };

};
