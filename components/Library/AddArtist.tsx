import PlusIconCs from "@/public/Icons/PlusIconCs"
const AddArtist = () => {
  return (
    <div className=" h-17.5 flex gap-3.75 items-center mt-1.75" >
      <div className="bg-[rgba(41,41,41,0.82)] text-white rounded-full w-17.5 h-17.5 flex items-center justify-center ">
       <PlusIconCs className="w-7 h-7 stroke-[rgba(255,255,255,1)]" />
      </div>
        <div className="h-12.25 flex flex-col justify-center">
        <p className="text-[rgba(255,255,255,1)] text-[14px] font-medium">Add Artist</p>
        </div>
      </div>
  )
}

export default AddArtist