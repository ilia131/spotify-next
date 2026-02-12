import { Song, setQueue } from "@/redux/features/playerSlice";
import { useAppDispatch } from "@/redux/hook";
import ImageMusicCard from "./ImageMusicCard";
import OptionCardMusic from "./OptionCardMusic";

interface MusicRowCardProps {
  item: Song;
  songs: Song[];
  index: number;
}

const MusicRowCard = ({item ,  songs , index} :MusicRowCardProps) => {
  const dispatch = useAppDispatch();


  const handlePlay = () => {
    dispatch(setQueue({ songs, startIndex: index }));
  };
 
  return (
      <div className=" h-12.75 flex items-center pr-6.25 gap-3.5 "
      onClick={handlePlay}

      >
        <ImageMusicCard item={item} />
        <OptionCardMusic item={item} />
      </div>
  )
}

export default MusicRowCard