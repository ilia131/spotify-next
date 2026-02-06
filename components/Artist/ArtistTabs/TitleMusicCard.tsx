
interface TitleMusicCardProps {
   title : string
}


const TitleMusicCard = ({title}:TitleMusicCardProps) => {
  return (
    <p className="text-[rgba(255,255,255,1)] text-[14px] font-normal ">{title}</p>
  )
}

export default TitleMusicCard