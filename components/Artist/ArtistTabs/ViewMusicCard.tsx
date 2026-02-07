

interface ViewMusicCardProps {
   countview : string
}

const ViewMusicCard = ({countview}:ViewMusicCardProps) => {
  return (
    <div className="flex items-center gap-1  ">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none" className="mb-[1.5px]">
                        <g clipPath="url(#clip0_238_51)">
                        <rect width="12" height="10" rx="1" fill="white" fillOpacity="0.5"/>
                        <path d="M5.672 3.32V4.72H7.552V5.608H5.672V7.088H7.792V8H4.552V2.408H7.792V3.32H5.672Z" fill="black" fillOpacity="0.81"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_238_51">
                        <rect width="12" height="10" rx="1" fill="white"/>
                        </clipPath>
                        </defs>
                  </svg>
            <p className="text-[rgba(255,255,255,0.6)] text-[12px]">{countview}</p>
        </div>
  )
}

export default ViewMusicCard