import Image from "next/image"
import images from "@/public/images"
import ThreeDots from "../ArtistButtons/ThreeDots"

const MusicRowCard = () => {
  return (
    <div className="w-89 h-12.75 flex items-center gap-[14px] ">
        <div className="flex gap-4.25 items-center mt-4.75">
           <p className="text-[rgba(255,255,255,1)]">1</p>
           <Image alt="covermusic" width={51} height={51} src={images.gucci} />
        </div>
        <div className="flex w-[269px] h-[39px] justify-between  mt-5 ">
            <div className="w-[73px] h-[39px] flex flex-col items-center ">
              <p className="text-[rgba(255,255,255,1)] text-[14px] font-normal mr-[7px]">Bad Zaat</p>
              <div className="flex items-center gap-1  ">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none"
              className="mb-[1.5px]"
              >
                        <g clip-path="url(#clip0_238_51)">
                        <rect width="12" height="10" rx="1" fill="white" fillOpacity="0.5"/>
                        <path d="M5.672 3.32V4.72H7.552V5.608H5.672V7.088H7.792V8H4.552V2.408H7.792V3.32H5.672Z" fill="black" fillOpacity="0.81"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_238_51">
                        <rect width="12" height="10" rx="1" fill="white"/>
                        </clipPath>
                        </defs>
                  </svg>
                  <p className="text-[rgba(255,255,255,0.6)] text-[12px]">2,971,476</p>
              </div>
            </div>
            <ThreeDots />
        </div>
      </div>
  )
}

export default MusicRowCard