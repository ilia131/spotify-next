
import ButtonsMusicPlayer from "./ButtonsMusicPlayer"



const MusicPlayer = () => {
    
  return (
    <section className="fixed  w-[96.5%] left-2.25 right-2.5  bg-linear-to-t from-[rgba(92,88,76,1)]  to-[rgba(92,88,76,1)]  
       bottom-22 h-14.25  z-4 rounded-[11px] flex pl-2 items-center justify-between pr-4.75">
      <ButtonsMusicPlayer />
      <div className='w-full pr-4 pl-3.25 bg-white h-0.5 mt-13.5'></div>

    </section>
  )
}

export default MusicPlayer