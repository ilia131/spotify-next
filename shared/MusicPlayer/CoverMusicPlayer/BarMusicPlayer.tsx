interface Props {
    progress: number
}


const BarMusicPlayer = ({progress}:Props) => {
  return (
    <div
   
    style={{ width: `${Math.min(progress, 100)}%` }}
  />
  )
}

export default BarMusicPlayer