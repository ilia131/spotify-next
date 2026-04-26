import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard"
import TitleMusic from "@/components/Artist/ArtistTabs/TitleMusic"
import { Song } from "@/redux/features/playerSlice";




interface TrendingTrackRowsProps {
  songs: Song[] 
}



const TrendingTracksRows = ({songs}:TrendingTrackRowsProps) => {
  return (
    <div className=" pl-4.5 pt-15.5  grid   gap-5  items-center">
      <TitleMusic title="Trending Hits" />
      {songs?.map((item , i)=>(
         <MusicRowCard key={i} item={item} songs={songs} index={i} />
      ))} 
   </div>
  )
}

export default TrendingTracksRows