import ShortVideo from "@/components/Artist/ArtistButtons/ShortVideo"
import SearchFilterTitle from "../SearchFilterTitle";
import { Shorts } from "@/redux/services/artistApislice";
import { useState } from "react";
import { useAppDispatch , useAppSelector } from "@/redux/hook";
import ReelsViewer from "@/features/explore/ui/reels-viewer";
import { setVideoPlaying } from "@/redux/features/playerSlice";
interface Props {
    shortvideo: Shorts[]
    title:string
}


const SearchShortVideo = ({shortvideo, title}:Props) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const dispatch = useAppDispatch();
  
    const videos = shortvideo?.slice(3) ?? [];
   
  return (
    <div className="w-full h-57  mt-8.5 flex flex-col gap-4.5 pl-4.25 pr-3.5">
    <SearchFilterTitle title={title} />
    <div className="flex justify-between gap-2">
    
    {shortvideo?.map((item , i)=>(
        <ShortVideo item={item} key={i} i={i} videos={videos}
        onOpen={(index) => {
                      dispatch(setVideoPlaying());
                      setActiveIndex(index);
                    }}
        />
    ))}
  </div>
  {activeIndex !== null && (
        <ReelsViewer
          videos={videos}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
  </div>
  )
}

export default SearchShortVideo