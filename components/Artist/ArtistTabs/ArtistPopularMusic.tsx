import MusicRowCard from "./MusicRowCard"
import images from "@/public/images"
import TitleMusic from "./TitleMusic"
import { Song } from "@/redux/features/playerSlice";


const artistcard = [
  {id: 1,musicname:'Bad Zaat' , image: images.HipHopLogist , countview:'2,971,476'},
  {id: 2,musicname:'Azmayeshgah' , image: images.gucci2, countview:'2,971,333'},
  {id:3,musicname:'Pore Pool' , image: images.vini3, countview:'5,445,222'},
  {id:4,musicname:'Too Late' , image: images.dorcci2, countview:'1,445,222'},
  {id:5,musicname:'Ta Farda' , image: images.vini2, countview:'1,445,222'},


]

interface ArtistPopularMusicProps {
  songs: Song[]
}



const ArtistPopularMusic = ({songs}:ArtistPopularMusicProps) => {
  return (
    <div className=" pl-4.5 pt-3.5  grid   gap-5  items-center">
      <TitleMusic title="Popular" />
      {songs.map((item , i)=>(
         <MusicRowCard key={i} item={item} songs={songs} index={i} />
      ))} 
   </div>
  )
}

export default ArtistPopularMusic