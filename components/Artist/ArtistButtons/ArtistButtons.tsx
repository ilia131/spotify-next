

import { Artist } from "@/redux/services/artistApislice"
import ArtistHeader from "./ArtistHeader"
import BackgroundLayers from "./BackgroundLayers"
import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage";



const ArtistButtons = ({data}:{data : Artist}) => {
  const dominantColor = useDominantColorFromImage(data?.profile_pic);

  return (
    <div className="absolute bottom-0 w-full h-37">
      <BackgroundLayers image={data?.profile_pic} />
      <ArtistHeader data={data} />
    </div>
  )
}

export default ArtistButtons