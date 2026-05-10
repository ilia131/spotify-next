import { Song, setQueue } from "@/redux/features/playerSlice";
import { useAppDispatch } from "@/redux/hook";
import ImageMusicCard from "./ImageMusicCard";
import OptionCardMusic from "./OptionCardMusic";

interface MusicRowCardProps {
  item: Song;
  songs: Song[];
  index: number;
  isPlaylistView?: boolean;
  playlistId?: string;


}

const MusicRowCard = ({item ,  songs , index , isPlaylistView , playlistId} :MusicRowCardProps) => {
  const dispatch = useAppDispatch();


  const handlePlay = () => {
    dispatch(setQueue({
      songs: [...songs],   
      startIndex: index
    }));
  };
  return (
      <div className=" h-12.75 flex items-center pr-6.25 gap-3.5 "
      onClick={handlePlay}

      >
        <ImageMusicCard item={item} index={index}/>
        <OptionCardMusic item={item} isPlaylistView={isPlaylistView}
                    playlistId={playlistId}

        />
      </div>
  )
}

export default MusicRowCard