import VerifySvg from "./VerifySvg"
const VerifyedText = () => {
  return (
    <div className="absolute top-4 w-full h-10.25 left-6.25 
    flex gap-4.25 items-center 
    ">
     <VerifySvg />
      <p className="text-[rgba(255,255,255,0.9)] text-[13px] font-semibold">VERIFIED ARTIST</p>
    </div>
  )
}

export default VerifyedText