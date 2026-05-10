

import { Artist } from "@/redux/services/artistApislice"
import ArtistHeader from "./ArtistHeader"
import BackgroundLayers from "./BackgroundLayers"



const ArtistButtons = ({data}:{data : Artist}) => {
  return (
    <div className="absolute bottom-0 w-full h-37">
      <BackgroundLayers  />
      <ArtistHeader data={data} />
    </div>
  )
}

export default ArtistButtons