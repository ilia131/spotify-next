interface ArtistName {
   artistname:string
}


const ArtistName = ({artistname}:ArtistName) => {
  return (
    <p className="text-[rgba(255,255,255,0.9)] z-99 absolute bottom-38 pl-4 text-[40px] font-extrabold">{artistname}</p>
  )
}

export default ArtistName