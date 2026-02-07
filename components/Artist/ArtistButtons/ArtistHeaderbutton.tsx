import OptionButtons from "./OptionButtons"
import PlayShuffle from "./PlayShuffle"

const ArtistHeaderButton = () => {
  return (
    <div className="pr-4.5 h-10.5  flex justify-between">
     <OptionButtons />
     <PlayShuffle />
    </div>
  )
}

export default ArtistHeaderButton