import MusicRowCard from "./MusicRowCard"

const ArtistPopularMusic = () => {
  return (
    <div className=" pl-4.5 pt-3.5 pr-4.5 grid h-full max-h-screen gap-[20px] pb-[200px] ">
      <h1  className="text-[rgba(255,255,255,1)] text-[18px] font-[600]">Popular</h1> 
      {[0,1,2,3,4,5].map((item , i)=>(
         <MusicRowCard key={i} />
      ))} 
   </div>
  )
}

export default ArtistPopularMusic