interface TrackInfoProps {
  artist: string
  album: string
  title: string
}
const TrackInfo = ({ artist, album, title }: TrackInfoProps) => {
  return (
    <p className="text-[10px] font-bold text-white/90 leading-5 line-clamp-3 ">
          <span>{artist} / &nbsp;</span>
          <span className="text-white/45">{album} –</span>
          <span className="block text-white/45">{title}</span>  
   </p>
  )
}

export default TrackInfo