import Preview from "./Preview"
import PlayOption from "./PlayOption"
const BottomBigArtist = () => {
  return (
     <div className="absolute bottom-4.75 left-4 right-4">
      <div className="flex justify-between items-center w-full">
        <Preview />
        <PlayOption />
      </div>
    </div>
  )
}

export default BottomBigArtist