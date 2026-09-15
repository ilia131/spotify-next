import Image from "next/image";
import BottomBigArtist from "@/components/FilterSlider/BigCardArtist/BottomBigArtist";
import TopCardAlbum from "./TopCardAlbum";
import BottomCardAlbum from "./BottomCardAlbum";
import { Song  , playSingleSong , togglePlay} from "@/redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook"

interface CardAlbumProps {
  album: {
    id: number;
    title: string;
    cover: string;
    release_date:string
    tracks:Song[]
    artist?: {
      name: string;
    }[];
  };
  firstTrack:Song

}

const CardAlbum = ({ album , firstTrack }: CardAlbumProps) => {
  const dispatch = useAppDispatch();
  const { isPlaying, currentSong } = useAppSelector((state) => state.player);
  
  const isThisActive = isPlaying && currentSong?.unique_id === firstTrack?.unique_id;
    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isThisActive) {
        dispatch(togglePlay());
      } else {
        dispatch(playSingleSong(firstTrack!));
      }
    };
    const handlePlay = () => {
      if (firstTrack) {
        dispatch(playSingleSong(firstTrack));
      }
    };
  const trackTitles = album.tracks
  ?.map((tracks) => tracks.title)
  .join(" • ");
  return (
    <div
      className="h-112.25 max-lg:w-89.75 max-md:w-full rounded-2xl py-3.75
      px-3 bg-[rgba(30,38,29,1)] flex flex-col items-center gap-4"
    >
      
      <TopCardAlbum title={album.title} artistname={album?.artist?.[0]?.name ?? ''} />

      <Image
        src={album.cover}
        width={167}
        height={168}
        className="w-41.75 h-42 object-cover rounded-[13px]"
        alt={album.title}
      />

      <BottomCardAlbum date={album?.release_date}    tracks={trackTitles}
      />

      <div className="w-full px-1">
        <BottomBigArtist isPlaying={isPlaying} onTogglePlay={handleToggle}  />
      </div>
    </div>
  );
};

export default CardAlbum;