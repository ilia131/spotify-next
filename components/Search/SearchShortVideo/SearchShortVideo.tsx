import { StaticImageData } from "next/image"
import ShortVideo from "@/components/Artist/ArtistButtons/ShortVideo"
import SearchFilterTitle from "../SearchFilterTitle";
interface Props {
    shortvideo: {
        musicname: string;
        cover: StaticImageData;
      }[];
    title:string
}


const SearchShortVideo = ({shortvideo, title}:Props) => {
  return (
    <div className="w-full h-57  mt-8.5 flex flex-col gap-4.5 pl-4.25 pr-3.5">
    <SearchFilterTitle title={title} />
    <div className="flex justify-between gap-2">
    {shortvideo.map((item , i)=>(
        <ShortVideo item={item} key={i} />
    ))}
  </div>
  </div>
  )
}

export default SearchShortVideo