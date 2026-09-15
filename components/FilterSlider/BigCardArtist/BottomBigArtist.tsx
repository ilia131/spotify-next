import Preview from "./Preview"
import PlayOption from "./PlayOption"
interface Props {
  isPlaying: boolean; // آیا این کارت در حال پخش است؟
  onTogglePlay: ( e : React.MouseEvent) => void;
}

const BottomBigArtist = ({ isPlaying, onTogglePlay }: Props) => {
  return (
      <div className="flex justify-between items-center w-full">
        <Preview isActive={isPlaying} />
        <PlayOption isPlaying={isPlaying} onTogglePlay={onTogglePlay} />
      </div>
   
  )
}

export default BottomBigArtist