import DownArrow from "@/public/Icons/DownArrow"
import ThreeCirlceFlex from "@/public/Icons/ThreeCircleFlex"

interface Props {
  onClose: () => void;
}

const TopCoverMp = ({onClose}:Props) => {
  return (
    <div className="flex justify-between items-center [@media(max-height:800px)]:mt-20 ">
    <DownArrow onClick={onClose} /> 
    <p className="text-[rgba(255,255,255,0.95)] text-[12px] font-medium">“dorcci” in Search</p>
    <ThreeCirlceFlex />
    </div>
  )
}

export default TopCoverMp