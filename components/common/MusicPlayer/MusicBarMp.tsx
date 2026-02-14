interface Props{
    progress:number
}


const MusicBarMp = ({progress}:Props) => {
  return (
    <div  className="w-full pr-4 pl-3.25 bg-[rgba(255,255,255,0.5)] h-0.5 mt-13.5 rounded-[1px] shrink-0 relative">
    <div
      className="w-full  bg-[rgba(255,255,255,1)] h-0.5 absolute left-0    transition-all duration-300 rounded-[1px]"
      style={{ width: `${Math.min(progress, 100)}%` }}
    />
   </div>
  )
}

export default MusicBarMp