import Image, { StaticImageData } from "next/image"

interface Props{
    item:{name:string , color:string , img:StaticImageData}
    i:number
}

const SearchFilterCard = ({item , i}:Props) => {
  return (
    <div className={`max-[394px]:w-41 h-13.5 pt-1.75 pl-2.25  max-[440px]:w-47 w-49.5
        max-[363px]:w-37 max-[340px]:w-35 max-[430px]:w-44 rounded-[11px] flex justify-between
        pr-2.25
        ${i % 2 === 0 ? "justify-self-start" : "justify-self-end"}
       ${item.color}`}>
        <div className="w-27.5 h-4.5 grid gap-0.5">
          <p className="text-[10px] font-semibold text-[rgba(255,255,255,0.8)]">{item.name}</p>
          <span className="text-[7px] text-[rgba(255,255,255,0.44)]">Stay in the Moment with the Hottest Live Events!</span>
        </div>
        <div className="flex pt-1 w-8.25">
        <Image src={item.img} width={33} height={33} alt='imgelemntdisc' 
        className="h-8.25 w-8.25 object-cover"
         />
        </div>
    </div>
  )
}

export default SearchFilterCard