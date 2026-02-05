import images from "@/public/images"
import LikedSongCard from "./LikedSongCard"

const recentartist = [
  {name:'Liked Songs' , pic:images.vini3 , desc:'Playlist . spo.' , rounded:'0' , type: "liked"  },
  {name:'hiphopologist' , pic:images.hip3 , desc:'EX' , rounded:'full' ,  type: "artist"},
  {name:'Daily Mix', pic:images.dorcci2 , desc:'Playlist . spo.' , rounded:'0' , type: "playlist"},
  {name:'Daily Mix1', pic:images.dorcci2 , desc:'Playlist . spo.' , rounded:'0' ,  type: "playlist"}

]


const RecentMusics = () => {
  return (
    <section className="pt-2.5   hide-scrollbar">
      <div className="w-93.25 h-8.75 flex justify-between pr-4 items-center">
          <h1 className="font-semibold text-[23px] text-[rgba(255_255_255/0.96)]">Recents</h1>
          <p className="text-[13px] text-[rgba(255_255_255/0.66)]">Show all</p>
      </div>
      <div className="w-93.25  pt-2.5 flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
         {recentartist.map((item, i)=>(
           <LikedSongCard item={item} key={i}/>
         ))}        
      </div>
    </section>
  )
}

export default RecentMusics