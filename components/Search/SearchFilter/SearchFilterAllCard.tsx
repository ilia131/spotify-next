import   { StaticImageData } from "next/image"
import SearchFilterTitle from "../SearchFilterTitle"
import SearchFilterLongCard from "./SearchFilterLongCard"

interface Props {
   categories2:{cover:StaticImageData}[]
   title:string
}


const SearchFilterAllCard = ({categories2 , title}:Props) => {
  return (
     <div className=" w-full flex flex-col mt-8.5 gap-5  pl-4 pr-3.5 pb-150 ">
                  <SearchFilterTitle title={title} />
                  <div className="w-full h-31.25 grid grid-cols-2 justify-between gap-y-5.5 ">
                     {categories2.map((item, i)=>(
         
                       <SearchFilterLongCard item={item} i={i} key={i} />
                    
                     ))}
                </div>
            </div>
  )
}

export default SearchFilterAllCard