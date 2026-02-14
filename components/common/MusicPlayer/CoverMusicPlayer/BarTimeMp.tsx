
interface Props {
  progress: number;
  lowerTime:string, 
  higherTime:string
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void

}
const BarTimeMp = ({progress , lowerTime , higherTime , handleSeek}:Props) => {
  

  return (
    <div className="w-full h-9.5 mt-3.25 flex flex-col  pt-2 gap-1.75 ">
    <div className="w-full h-1 bg-[rgba(167,162,162,0.64)] relative"
    onClick={handleSeek}
    >
    <div
          className="w-full  bg-[rgba(255,255,255,0.5)] h-1 absolute     transition-all duration-300 rounded-[1px]"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
    </div>
    <div className="flex w-full justify-between">
        <p className="text-[rgba(255,255,255,0.75)] text-[12px]">{lowerTime}</p>
        <p className="text-[rgba(255,255,255,0.75)] text-[12px]">{higherTime}</p>
     </div>
   </div>
  )
}

export default BarTimeMp