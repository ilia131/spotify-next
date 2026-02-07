import { mapItems } from "@/components/FilterSlider/utils";
import TitleMusic from "../ArtistTabs/TitleMusic";
import CardSlider from "@/components/common/CardSlider/CardSlider";

const ArtistFeaturing = () => {
  return (
    <div className="pl-4.5 mt-10 grid pr-4 gap-2.25">
       <TitleMusic title='Featuring Ashkan kagan'/>
       <CardSlider    cardimages={mapItems(["hiphoplogist","gucci" ])} title="" />
    </div> 
  )
}

export default ArtistFeaturing