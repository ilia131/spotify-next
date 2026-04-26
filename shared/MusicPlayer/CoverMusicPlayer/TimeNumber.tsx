interface Props {
    timenumber:string
}

const TimeNumber = ({timenumber}:Props) => {
  return (
    <p className="text-[rgba(255,255,255,0.75)] ">{timenumber}</p>
  )
}

export default TimeNumber