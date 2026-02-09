import CastPlayer from "./CastPlayer"
import PauseSvg from "./PauseSvg"
const LeftButtonMPlayer = () => {
  return (
    <div className=" w-14 flex items-center justify-between">
        <CastPlayer />
        <PauseSvg />

  </div>
  )
}

export default LeftButtonMPlayer