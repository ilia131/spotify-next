import { StaticImageData } from "next/image"
import LibraryMusicCard from "./LibraryMusicCard"
import AddArtist from "./AddArtist"
interface Props {
    musiccard : {name:string , cover:StaticImageData , type:string}[]
}
const ArtistLibrary = ({musiccard}:Props) => {
  return (
    <div className="w-full relative top-42 px-4 pb-40 grid gap-1.75">
    {musiccard.map((item, i)=>(
         <LibraryMusicCard item={item} key={i} />
        ))}
       <AddArtist />
   </div>
  )
}

export default ArtistLibrary