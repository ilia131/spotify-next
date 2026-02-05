
import ArtistTabs from "../ArtistTabs/ArtistTabs"
import OptionButtons from "./OptionButtons"
import PlayShuffle from "./PlayShuffle"
import ViewsMonthly from "./ViewsMonthly"


const ArtistButtons = () => {
  return (
     
    <div className="absolute inset-0 bg-[linear-gradient(358.14deg,rgba(30,21,19,0.04)_27%,rgba(184,113,101,0.22)_92.15%)] flex flex-col pl-4 pt-3 gap-3">
        <ViewsMonthly />
         <div className="pr-4.5 h-10.5  flex justify-between">
           <OptionButtons />
           <PlayShuffle />
         </div>
        <ArtistTabs />
      </div>
  )
}

export default ArtistButtons