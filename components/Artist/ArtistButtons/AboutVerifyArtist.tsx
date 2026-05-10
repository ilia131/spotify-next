import { Artist } from "@/redux/services/artistApislice"

const AboutVerifyArtist = ({data}:{data:Artist}) => {
  return (
    <div className="grid absolute  bottom-6 w-full h-23 left-7.5 gap-5.5 ">
        <p className="text-[rgba(255,255,255,0.75)] text-[16px] font-medium max-[390px]:text-[13px]">{data?.monthly_listeners} monthly listeners</p>
         <p className="text-[rgba(255,255,255,0.75)] text-[16px] font-medium
         max-[390px]:text-[13px]
         ">
           {data?.bio}
         </p>
    </div>
  )
}

export default AboutVerifyArtist