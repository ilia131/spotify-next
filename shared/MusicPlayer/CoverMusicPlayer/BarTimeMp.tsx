import TimeNumber from "./TimeNumber";

interface Props {
  progress: number;
  lowerTime:string, 
  higherTime:string
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void
  buffered:number


}
const BarTimeMp = ({progress , lowerTime , higherTime , handleSeek , buffered}:Props) => {

  return (
    <div className="w-full h-9.5 mt-3.25 flex flex-col  pt-2 gap-1.75 ">
    <div className="w-full h-1 bg-[rgba(167,162,162,0.64)] relative"
    onClick={handleSeek}
    >
      
    <div
          className="absolute h-1 bg-[rgba(255,255,255,0.25)] rounded-[1px]"
          style={{ width: `${Math.min(buffered,100)}%` }}
        />

    <div
          className="w-full  bg-[rgba(255,255,255,0.5)] h-1 absolute     rounded-[1px]"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
    </div>
    <div className="flex w-full justify-between text-[12px]">
        <TimeNumber timenumber={lowerTime} />
        <TimeNumber timenumber={higherTime} />

     </div>
   </div>
  )
}

export default BarTimeMp