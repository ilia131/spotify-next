import Image from "next/image"
import VerifyedText from "./VerifyedText";
import AboutVerifyArtist from "./AboutVerifyArtist";
import images from "@/public/images";
import TitleMusic from "../ArtistTabs/TitleMusic";
import { Artist } from "@/redux/services/artistApislice";
const ArtistVerify = ({data}: {data:Artist}) => {
  return (
  <div className="grid pl-4.5 mt-4 gap-3">
    <TitleMusic title="About" />
    <div className="w-full h-91.5 pr-4 relative ">
     <Image  width={358} height={366} src={data?.profile_pic} alt='kagan'  
     className="w-full h-91.5 object-cover" unoptimized
     />
     <VerifyedText />
     <AboutVerifyArtist  data={data}/>
   </div>
   </div>
  )
}

export default ArtistVerify