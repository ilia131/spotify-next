import SearchFilterTitle from "../SearchFilterTitle"
import SearchFilterCard from "./SearchFilterCard"

interface Props {
    categories:{name:string , color:string}[]
    title:string
}

const SearchFilterSection = ({categories , title}:Props) => {
  return (
    <div className="h-42.75 w-full flex flex-col mt-8.5 gap-5 pl-4 pr-3.5">
    <SearchFilterTitle title={title} />
    <div className="w-full h-31.25 grid grid-cols-2 justify-between gap-y-3 ">
        {categories.map((item, i)=>(
            <SearchFilterCard item={item} key={i} i={i} />
        ))}
    </div>
   </div>
  )
}

export default SearchFilterSection