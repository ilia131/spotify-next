
import RightButtonMPlayer from './RightButtonMPlayer'
import LeftButtonMPlayer from './LeftButtonMPlayer'
const ButtonsMusicPlayer = () => {
  return (
    <div className='fixed  w-[96.5%] left-2.25 right-2.5  flex pl-2 items-center justify-between pr-5.75'>
            <RightButtonMPlayer />
            <LeftButtonMPlayer />
       </div>
  )
}

export default ButtonsMusicPlayer