
const BottomCardAlbum = ({date , tracks}:{date:string , tracks:string}) => {
  return (
    <div className="w-full h-20.25 flex gap-4 items-center px-6">
    <p className="text-[12px] font-bold text-white/90 leading-5 line-clamp-5">
      <span className="" >{date}</span>
      <span className=" text-white/45">
      &nbsp;&nbsp;/ - {tracks}</span>
      </p>
  </div>
  )
}

export default BottomCardAlbum