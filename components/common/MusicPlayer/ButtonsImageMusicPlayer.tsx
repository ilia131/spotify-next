
import RightButtonMPlayer from './RightButtonMPlayer'
import LeftButtonMPlayer from './LeftButtonMPlayer'
import { Song } from '@/redux/features/playerSlice';
type ButtonsImageMusicPlayerProps = {
  onClick: () => void;
  currentSong:Song
};

const ButtonsImageMusicPlayer = ({onClick , currentSong}:ButtonsImageMusicPlayerProps) => {
  return (
    <div className='fixed  w-[96.5%] left-2.25 right-2.5  flex pl-2 items-center justify-between pr-5.75'>
            <RightButtonMPlayer currentSong={currentSong} />
            <LeftButtonMPlayer onClick={onClick} />
       </div>
  )
}

export default ButtonsImageMusicPlayer