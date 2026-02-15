import { OverlayLeft } from "../common/NavSlider/OverlayLeft"
import SearchIconCs from "@/public/Icons/SearchIconCs"
import PlusIconCs from "@/public/Icons/PlusIconCs"
const HeaderLibrary = () => {
  return (
    <div className="w-full h-9 flex items-center justify-between">
      <div className="relative flex w-37.75 items-center ">
         <OverlayLeft />
         <p className="text-[24px] text-[#FFFFFF] font-bold left-11.25 relative max-[340px]:text-[20px] max-[340px]:top-0.5">Your Library</p>
      </div>
      <div className="w-15.75 h-5 flex gap-5.75 items-center">
        <SearchIconCs fill="white" fillOpacity="0.8"/>
         <PlusIconCs/>
      </div>
   </div>   
  )
}

export default HeaderLibrary