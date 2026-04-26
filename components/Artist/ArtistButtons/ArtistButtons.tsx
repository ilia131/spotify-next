

import ArtistHeader from "./ArtistHeader"
import BackgroundLayers from "./BackgroundLayers"



const ArtistButtons = () => {
  return (
    <div className="absolute bottom-0 w-full h-37">
      <BackgroundLayers />
      <ArtistHeader />
    </div>
  )
}

export default ArtistButtons