
import FollowButton from "./FollowButton"
import IconShortClip from "./IconShortClip"
import ThreeDots from "./ThreeDots"

const OptionButtons = ({artist_uuid}:{artist_uuid:string}) => {
  return (
    <div className="w-43.25 flex justify-between  items-center">
     <IconShortClip />
     <FollowButton artistUuid={artist_uuid} />
     <ThreeDots />
  </div>
  )
}

export default OptionButtons