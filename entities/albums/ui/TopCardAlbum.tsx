import DiscIcon from "@/public/Icons/DiscIcon"

const TopCardAlbum = () => {
  return (
    <div className="w-full h-20.25 flex gap-4 items-center pr-4">
    <div>
       <DiscIcon/>
     </div>
     <p className="text-[13px] font-bold text-white/90 leading-5 line-clamp-3">
         <span className="">Sajad shahi /  &nbsp;</span>
         <span className=" text-white/45">Western Sweden –</span>
         <span className="block text-white/45">New Documentary in the Swedish Radio App</span>
     </p>
   </div>
  )
}

export default TopCardAlbum