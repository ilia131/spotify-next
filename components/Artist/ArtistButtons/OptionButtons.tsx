
import FollowButton from "./FollowButton"
import IconShortClip from "./IconShortClip"
import ThreeDots from "./ThreeDots"

const OptionButtons = () => {
  return (
    <div className="w-43.25 flex justify-between  items-center">
     <IconShortClip />
     <FollowButton />
     <ThreeDots />
  </div>
  )
}

export default OptionButtons