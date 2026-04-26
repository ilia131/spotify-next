import TitleMusic from "../TitleMusic"

import ArtistPickDetail from "./ArtistPickDetail"
import { ArtistPickProps2 } from "@/redux/services/artistApislice"
const ArtistPick = ({artistpick} : {artistpick?:ArtistPickProps2}) => {
  return (
    <div className="grid  pl-4.5 pt-6.75 pr-4">
        <TitleMusic title='Artist Pick' />
        <ArtistPickDetail artistpick={artistpick} />
    </div>
  )
}

export default ArtistPick