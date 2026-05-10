
import { Artist } from "@/redux/services/artistApislice"
import ArtistTabs from "../ArtistTabs/ArtistTabs"
import ArtistHeaderButton from "./ArtistHeaderbutton"
import ViewsMonthly from "./ViewsMonthly"

const ArtistHeader = ({data}:{data:Artist}) => {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(358.14deg,rgba(30,21,19,0.04)_27%,rgba(184,113,101,0.22)_92.15%)] flex flex-col pl-4 pt-3 gap-3">
         <ViewsMonthly monthly_listeners={data?.monthly_listeners} />
         <ArtistHeaderButton artist_uuid={data?.uuid} />
         <ArtistTabs />
    </div>
  )
}

export default ArtistHeader