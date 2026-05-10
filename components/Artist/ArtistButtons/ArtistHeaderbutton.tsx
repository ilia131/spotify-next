import OptionButtons from "./OptionButtons"
import PlayShuffle from "./PlayShuffle"

const ArtistHeaderButton = ({artist_uuid}:{artist_uuid : string}) => {
  return (
    <div className="pr-4.5 h-10.5  flex justify-between">
     <OptionButtons artist_uuid={artist_uuid}/>
     <PlayShuffle />
    </div>
  )
}

export default ArtistHeaderButton