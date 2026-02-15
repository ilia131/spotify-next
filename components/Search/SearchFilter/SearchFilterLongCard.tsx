import Image , {StaticImageData} from "next/image"

interface Props{
    item:{cover:StaticImageData}
    i:number
}



const SearchFilterLongCard = ({item , i}:Props) => {
  return <Image   
  src={item.cover}
  alt='artistcover' 
  width={164} height={96} 
  className={` max-[394px]:w-41 h-24  rounded-[5px]  max-[440px]:w-47 w-49.5
  max-[363px]:w-37 max-[340px]:w-35 max-[430px]:w-44 object-cover
  ${i % 2 === 0 ? "justify-self-start" : "justify-self-end"}`}
/>         
            
   

}

export default SearchFilterLongCard