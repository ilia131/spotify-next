
import { Artist } from "@/redux/services/artistApislice"
import ArtistTabs from "../ArtistTabs/ArtistTabs"
import ArtistHeaderButton from "./ArtistHeaderbutton"
import ViewsMonthly from "./ViewsMonthly"
import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage"

const ArtistHeader = ({data}:{data:Artist}) => {
  const dominantColor = useDominantColorFromImage(data.profile_pic);
  return (
    <div className="absolute inset-0 
     flex flex-col pl-4 pt-3 gap-3"
     >
      
         <ViewsMonthly monthly_listeners={data?.monthly_listeners} />
         <ArtistHeaderButton artist_uuid={data?.uuid} />
         <ArtistTabs />
    </div>
  )
}

export default ArtistHeader