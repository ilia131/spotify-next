import { StaticImageData } from "next/image"
import ImageMusicCard from "./ImageMusicCard"
import OptionCardMusic from "./OptionCardMusic"


interface ItemProps {
   item:ArtistProps
}


interface ArtistProps {
  id: number
  musicname : string
  image: StaticImageData;
  countview:string;
}

const MusicRowCard = ({item} :ItemProps) => {
  return (
      <div className=" h-12.75 flex items-center pr-6.25 gap-3.5 ">
        <ImageMusicCard item={item} />
        <OptionCardMusic item={item} />
      </div>
  )
}

export default MusicRowCard