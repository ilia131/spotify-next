import TitleMusic from "../TitleMusic"

import ArtistPickDetail from "./ArtistPickDetail"

const ArtistPick = () => {
  return (
    <div className="grid  pl-4.5 pt-6.75 pr-4">
        <TitleMusic title='Artist Pick' />
        <ArtistPickDetail />
    </div>
  )
}

export default ArtistPick