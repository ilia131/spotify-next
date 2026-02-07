import MusicRowCard from "./MusicRowCard"
import images from "@/public/images"
import TitleMusic from "./TitleMusic"



const artistcard = [
  {id: 1,musicname:'Bad Zaat' , image: images.HipHopLogist , countview:'2,971,476'},
  {id: 2,musicname:'Azmayeshgah' , image: images.gucci2, countview:'2,971,333'},
  {id:3,musicname:'Pore Pool' , image: images.vini3, countview:'5,445,222'},
  {id:4,musicname:'Too Late' , image: images.dorcci2, countview:'1,445,222'},
  {id:5,musicname:'Ta Farda' , image: images.vini2, countview:'1,445,222'},


]




const ArtistPopularMusic = () => {
  return (
    <div className=" pl-4.5 pt-3.5  grid   gap-5  items-center">
      <TitleMusic title="Popular" />
      {artistcard.map((item , i)=>(
         <MusicRowCard key={i} item={item} />
      ))} 
   </div>
  )
}

export default ArtistPopularMusic